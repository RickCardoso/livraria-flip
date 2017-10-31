$(document).ready(function() {

  // clear results
  function clearResults() {
    $('.book-row').empty();
  }

  // update results with given parameter
  function updateBookshelf(param) {
    $.getJSON("https://www.googleapis.com/books/v1/volumes?q=" + param + "&filter=paid-ebooks&key=AIzaSyCi2WxQ_ucjDYq2pGERzwpMliLIqJ001dg", function(json) {
      for (var i = 0; i < json.items.length; i++) {
        $('.book-row').append($('<div></div>').attr('class', 'book-col')
          .append($('<div></div>').attr('class', 'book-box')
            .append($('<span></span>').attr('class', 'book-id').attr('style', 'display:none;').text(json.items[i].id))
            .append($('<h1></h1>').attr('class', 'book-title').text(json.items[i].volumeInfo.title))
            .append($('<div></div>').attr('class', 'row')
              .append($('<div></div>').attr('class', 'detail-col')
                // .append($('<div></div>').attr('class', 'cover-container')
                  .append($('<img></img>').attr('class', 'img-fluid').attr('src', json.items[i].volumeInfo.imageLinks.thumbnail).attr('alt', 'cover'))
                // )
              )
              .append($('<div></div>').attr('class', 'detail-col')
                .append($('<p></p>').attr('class', 'book-description').text((json.items[i].volumeInfo.description.length > 100) ? json.items[i].volumeInfo.description.substring(0, 100) + String.fromCharCode(8230) : json.items[i].volumeInfo.description.length))
                .append($('<button></button>').attr('class', 'btn-std btn-learn-more').text('Learn More ')
                  .append($('<i></i>').attr('class', 'far fa-ellipsis-h'))
                )
                .append($('<div></div>').attr('class', 'price-container')
                  .append($('<p></p>').attr('class', 'book-price')
                    .text(JSON.stringify(json.items[i].saleInfo.listPrice.amount))
                    .prepend($('<span></span>').attr('class', 'small').text('R$ '))
                  )
                )
              )
            )
          )
          .append($('<button></button>').attr('class', 'btn-std btn-cart btn-add').text('Adicionar ao carrinho'))
        );
      }
    });
  }

  // initial search results
  updateBookshelf('stone');

  // update results with user input
  $('.btn-search').click(function() {
    clearResults();
    updateBookshelf($('.search-bar').val());
  });

  // cart button
  $('.btn-add').click(function() {
    $(this).toggleClass('added');
  });

});
