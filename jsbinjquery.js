$(document).ready(function () {
  console.log("ready!");

  var windowHeight = $(window).height();
  var headerBarHeight = $(".header").height();
  var codeContainerHeight = $(".codeContainer").height();

  $(".codeContainer").height(windowHeight - headerBarHeight);

  $(".toggle a").click(function () {
    $(this).toggleClass("selected");
    var activeDiv = $(this).html();
    $("." + activeDiv.toLowerCase() + "Container").toggle(500);
    var showingDivs = $(activeDiv).filter(".selected").css("width");

    var width = 100 / showingDivs;
    $(activeDiv).filter(".selected").css("width", width);
  });

  document.addEventListener(
    "keydown",
    function (e) {
      if (
        (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) &&
        e.keyCode == 83
      ) {
        e.preventDefault();
        runCode();
      }
    },
    false
  );

  $("#run").click(function () {
    runCode();
  });
});

function runCode() {
  console.log("Run clicked");
  const getGeneratedPageURL = ({ html, css, js }) => {
    const getBlobURL = (code, type) => {
      const blob = new Blob([code], { type });
      return URL.createObjectURL(blob);
    };

    const cssURL = getBlobURL(css, "text/css");
    const jsURL = getBlobURL(js, "text/javascript");

    const source = `
        <html>
          <head>
            ${
              css &&
              `<link rel="stylesheet" type="text/css" href="${cssURL}" />`
            }
            ${js && `<script src="${jsURL}"></script>`}
          </head>
          <body>
            ${html || ""}
          </body>
        </html>
      `;

    return getBlobURL(source, "text/html");
  };

  const url = getGeneratedPageURL({
    html: $("#htmlContent").val() + "",
    css: $("#cssContent").val() + "",
    js: $("#jsContent").val() + "",
  });

  const iframe = document.querySelector(".iframe");
  iframe.src = url;
}
