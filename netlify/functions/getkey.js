exports.handler = async (event, context) => {
    if (event.httpMethod !== "GET") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    // Verifica o token secreto enviado pelo programa
    const token = event.headers["x-app-token"];
    const validToken = process.env.APP_TOKEN;

    if (!token || token !== validToken) {
        return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        return { statusCode: 500, body: JSON.stringify({ error: "Key não configurada" }) };
    }

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store"
        },
        body: JSON.stringify({ key: apiKey })
    };
};