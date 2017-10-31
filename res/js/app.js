$(document).ready(function() {

  $.getJSON("https://www.googleapis.com/books/v1/volumes?q=stone&filter=paid-ebooks&key=AIzaSyCi2WxQ_ucjDYq2pGERzwpMliLIqJ001dg", function(json) {
    for (var i = 0; i < json.items.length; i++) {
      $('.book-row').append($('<div></div>').attr('class', 'book-col')
        .append($('<div></div>').attr('class', 'book-box')
          .append($('<span></span>').attr('class', 'book-id').attr('style', 'display:none;').text(json.items[i].id))
          .append($('<h1></h1>').attr('class', 'book-title').text(json.items[i].volumeInfo.title))
          .append($('<div></div>').attr('class', 'cover-container')
            .append($('<img></img>').attr('class', 'book-cover').attr('src', json.items[i].volumeInfo.imageLinks.thumbnail).attr('alt', 'cover'))
          )
          .append($('<p></p>').attr('class', 'book-description').text((json.items[i].volumeInfo.description.length > 100) ? json.items[i].volumeInfo.description.substring(0, 100) + String.fromCharCode(8230) : json.items[i].volumeInfo.description.length))
          .append($('<button></button>').attr('class', 'btn-learn-more').text('Learn More'))
          .append($('<p></p>').attr('class', 'book-price').text(JSON.stringify(json.items[i].saleInfo.listPrice.amount)))
          .append($('<button></button>').attr('class', 'btn-cart btn-add').text('Adicionar ao carrinho'))
        )
      );
    }
  });

});
