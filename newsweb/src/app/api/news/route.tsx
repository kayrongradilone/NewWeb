export async function GET() {
    try {
      const response = await fetch(
        "https://api.first.org/data/v1/nes"
      );
      if (!response.ok) {
        return new Response(JSON.stringify({ error: "Erro ao buscar notícias" }), {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Falha na requisição" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  