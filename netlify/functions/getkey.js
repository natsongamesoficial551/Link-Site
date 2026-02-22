exports.handler = async (event, context) => {
    // Bloqueia qualquer método que não seja GET
    if (event.httpMethod !== "GET") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    // Pega a key da variável de ambiente do Netlify (nunca fica no código)
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        return { statusCode: 500, body: JSON.stringify({ error: "Key não configurada" }) };
    }

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            // Impede cache — sempre busca fresh
            "Cache-Control": "no-store"
        },
        body: JSON.stringify({ key: apiKey })
    };
};
