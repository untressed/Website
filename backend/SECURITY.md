# Security Documentation - UNTRESSED

## Overview

This document outlines the security measures implemented in the UNTRESSED web application to protect against common vulnerabilities and ensure data integrity.

---

## Security Features Implemented

### 1. Security Headers (Helmet.js)

**Protection Against:**
- Cross-Site Scripting (XSS)
- Clickjacking
- MIME type sniffing
- Man-in-the-middle attacks

**Headers Set:**
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `Strict-Transport-Security` - Enforces HTTPS
- `Content-Security-Policy` - Controls resource loading

---

### 2. Rate Limiting

**Authentication Endpoints** (`/api/auth/login`, `/api/auth/register`):
- **Limit:** 5 requests per 15 minutes per IP
- **Purpose:** Prevent brute-force attacks and credential stuffing

**Order Creation** (`/api/orders`):
- **Limit:** 10 orders per hour per IP
- **Purpose:** Prevent spam orders and resource exhaustion

**General API Routes** (`/api/*`):
- **Limit:** 100 requests per 15 minutes per IP
- **Purpose:** Prevent DDoS attacks

---

### 3. Input Validation & Sanitization

**Validation Rules:**

**Registration:**
- Name: 2-100 characters
- Email: Valid email format
- Password: Minimum 8 characters, must contain uppercase, lowercase, and number
- Contact: Valid phone number format
- Address: Maximum 500 characters
- Organization: Maximum 200 characters

**Login:**
- Email: Valid email format
- Password: Required

**Orders:**
- Order items: Minimum 1 item
- Quantity: 1-100 per item
- Price: Positive numbers only
- Customer details: All required fields validated

**Contact Form:**
- Name: 2-100 characters
- Email: Valid email format
- Message: 10-1000 characters

**Sanitization:**
- NoSQL injection prevention using `express-mongo-sanitize`
- XSS attack prevention using `xss-clean`
- All user inputs are trimmed and normalized

---

### 4. CORS (Cross-Origin Resource Sharing)

**Configuration:**
- Whitelist-based origin validation
- Credentials support enabled
- Allowed methods: GET, POST, PUT, DELETE, PATCH
- Allowed headers: Content-Type, Authorization

**Environment Variable:**
```
CLIENT_URL=https://your-frontend-domain.com
```

For multiple origins, use comma-separated values:
```
CLIENT_URL=https://domain1.com,https://domain2.com
```

**Development Default:**
- `http://localhost:5173`
- `http://localhost:3000`

---

### 5. JWT Authentication

**Configuration:**
- Token expiration: 7 days
- Secure secret requirement: Minimum 32 characters
- Token verification on protected routes
- Expired token detection with specific error messages

**Protected Routes:**
- `/api/auth/me` - Get current user
- `/api/orders/myorders` - Get user's orders

---

### 6. Password Security

**Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

**Storage:**
- Passwords are hashed using bcrypt with salt rounds of 10
- Never stored in plain text
- Never logged or exposed in responses

---

### 7. Guest Order Security

**Implementation:**
- Guest orders are allowed without account creation
- No automatic user creation with predictable passwords
- Orders linked to existing users by email if available
- Guest orders stored with `user: null`

---

## Environment Variables

### Required Variables

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Authentication
JWT_SECRET=your-very-long-and-secure-secret-key-minimum-32-characters

# CORS
CLIENT_URL=https://your-frontend-domain.com

# Environment
NODE_ENV=production
```

### Security Requirements

1. **JWT_SECRET:**
   - Minimum 32 characters
   - Use a cryptographically secure random string
   - Generate using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

2. **MONGO_URI:**
   - Use MongoDB Atlas with IP whitelisting
   - Enable database encryption at rest
   - Use strong database passwords

3. **CLIENT_URL:**
   - Never use wildcard (`*`) in production
   - Set to specific frontend domain(s)
   - Validate before deployment

---

## Request Size Limits

**Body Parser Limits:**
- JSON payload: 10MB maximum
- URL-encoded payload: 10MB maximum

**Purpose:** Prevent memory exhaustion attacks

---

## Logging & Monitoring

**Security Events Logged:**
- Failed login attempts
- Token verification failures
- CORS violations
- Rate limit violations
- Input sanitization triggers
- Order creation (authenticated vs guest)

**Log Format:**
```
✅ Success events
⚠️  Warning events
❌ Error events
📨 Request logging
```

---

## Deployment Security Checklist

### Before Deployment

- [ ] Set strong `JWT_SECRET` (32+ characters)
- [ ] Configure `CLIENT_URL` to production domain
- [ ] Set `NODE_ENV=production`
- [ ] Verify `MONGO_URI` is secure
- [ ] Enable MongoDB IP whitelisting
- [ ] Review all environment variables
- [ ] Test rate limiting
- [ ] Test CORS configuration
- [ ] Verify SSL/TLS certificate

### After Deployment

- [ ] Monitor error logs for 48 hours
- [ ] Check for blocked legitimate requests
- [ ] Verify security headers in browser DevTools
- [ ] Test authentication flow
- [ ] Test guest order flow
- [ ] Verify rate limiting works
- [ ] Check CORS from frontend

---

## Known Limitations

### 1. Payment Simulation
⚠️ **WARNING:** Payment processing is currently simulated. All orders are marked as paid automatically.

**Before Production:**
- Integrate real payment gateway (Stripe, PayPal, Razorpay)
- Implement webhook verification
- Add payment failure handling
- Implement refund functionality

### 2. Email Verification
Currently, user registration does not require email verification.

**Recommended:**
- Implement email verification for new accounts
- Add password reset functionality via email
- Send order confirmation emails

### 3. Two-Factor Authentication
Not currently implemented.

**Recommended for Future:**
- Add 2FA for user accounts
- Implement backup codes
- Support authenticator apps (Google Authenticator, Authy)

---

## Security Best Practices

### For Developers

1. **Never commit `.env` files** to version control
2. **Use environment variables** for all secrets
3. **Validate all user inputs** on both frontend and backend
4. **Keep dependencies updated** regularly
5. **Review security logs** weekly
6. **Use HTTPS** in production
7. **Implement proper error handling** without exposing sensitive data
8. **Use parameterized queries** to prevent SQL/NoSQL injection
9. **Sanitize outputs** to prevent XSS
10. **Follow principle of least privilege** for database access

### For Deployment

1. **Use Render's environment variable dashboard** instead of `.env` files
2. **Enable automatic security updates** for dependencies
3. **Set up monitoring and alerting** for suspicious activity
4. **Regularly backup database** with encryption
5. **Implement IP whitelisting** for database access
6. **Use secrets management** for sensitive data (AWS Secrets Manager, HashiCorp Vault)
7. **Enable DDoS protection** at infrastructure level
8. **Implement Web Application Firewall (WAF)** for additional protection

---

## Incident Response

### If Security Breach Suspected

1. **Immediately rotate all secrets:**
   - Generate new `JWT_SECRET`
   - Update database passwords
   - Invalidate all existing tokens

2. **Review logs** for suspicious activity

3. **Notify affected users** if data was compromised

4. **Document the incident** and lessons learned

5. **Update security measures** to prevent recurrence

---

## Reporting Security Vulnerabilities

If you discover a security vulnerability, please report it to:

**Email:** security@untressed.com

**Please include:**
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

**Do not:**
- Publicly disclose the vulnerability before it's fixed
- Exploit the vulnerability beyond proof-of-concept

---

## Compliance

This application implements security measures aligned with:

- **OWASP Top 10** - Protection against common web vulnerabilities
- **GDPR** - Data protection and privacy requirements
- **PCI DSS** - Payment card industry standards (when real payment is integrated)

---

## Security Audit History

| Date | Auditor | Findings | Status |
|------|---------|----------|--------|
| 2025-12-22 | Internal | 10 vulnerabilities identified | Fixed |

---

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Helmet.js Documentation](https://helmetjs.github.io/)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)

---

**Last Updated:** 2025-12-22  
**Version:** 1.0
