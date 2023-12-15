const cnt = document.getElementById("cnt");

cnt.innerText = "Welcomeee";

document.getElementById("btn").addEventListener("click", () => {
  PromiseCallAPI();
});

///Using promise

function PromiseCallAPI() {
  const art_promise = new Promise((resolve, reject) => {
    let data = fetch(
      "https://newsapi.org/v2/everything?q=bitcoin&apiKey=a65f25b156db45fe98b5db96e85ce606"
    )
      .then((res) => res.json())
      .then((dt) => resolve(dt))
      .catch((e) => {
        reject(e);
      });
  });

  art_promise
    .then((res) => {
      const art = res.articles[10];
      document.getElementById("image").src = art.urlToImage;
      document.getElementById("news-header").innerText = art.title;
      document.getElementById("author").innerText = "by : " + art.author;
      document.getElementById("pb_date").innerText ="Published on : " + art.publishedAt;
      document.getElementById("cnt").innerText = art.content;
      document.getElementById("disc").innerText = art.description;
      document.getElementById("src").innerText = art.source.name;
      document.getElementById("link").href = art.url;
      console.log(art);
    })
    .catch((e) => {
      console.log(e);
    });
}


//Using aync await


async function AsyncCallAPI() {
  try {
    const data = await fetch(
      "https://newsapi.org/v2/everything?q=bitcoin&apiKey=a65f25b156db45fe98b5db96e85ce606"
    );//always return promise

    const resl = await data.json();//we have to convert it into data by using .json() which returns object
    const art = resl.articles[0];

    document.getElementById("image").src = art.urlToImage;
    document.getElementById("news-header").innerText = art.title;
    document.getElementById("author").innerText = "by : " + art.author;
    document.getElementById("pb_date").innerText ="Published on : " + art.publishedAt;
    document.getElementById("cnt").innerText = art.content;
    document.getElementById("disc").innerText = art.description;
    document.getElementById("src").innerText = art.source.name;
    document.getElementById("link").href = art.url;
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}
