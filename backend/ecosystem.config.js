module.exports = {
    apps: [
        {
            name: "untressed-backend",
            script: "./server.js",
            instances: 1, // Or "max" for cluster mode
            autorestart: true,
            watch: false,
            max_memory_restart: "1G",
            env: {
                NODE_ENV: "production",
                PORT: 5500 // Matching current project config (server.js & .env)
            }
        }
    ]
};
