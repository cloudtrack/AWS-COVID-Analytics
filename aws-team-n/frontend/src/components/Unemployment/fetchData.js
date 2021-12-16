export const fetchData = (url, setData) =>
  fetch(url)
    .then((response) => {
      return response.body;
    })
    .then((rb) => {
      const reader = rb.getReader();

      return new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              controller.enqueue(value);
              push();
            });
          }
          push();
        },
      });
    })
    .then((stream) => {
      return new Response(stream, {
        headers: { "Content-Type": "text/html" },
      }).text();
    })
    .then((result) => {
      const json = JSON.parse(result);
      setData(json.body);
    });
