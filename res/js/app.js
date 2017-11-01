$(document).ready(function() {

  // clear results
  function clearResults() {
    $('.book-row').empty();
  }

  // update results with given parameter
  function updateBookshelf(param) {
    $.getJSON("https://www.googleapis.com/books/v1/volumes?q=" + param + "&filter=paid-ebooks&key=AIzaSyCi2WxQ_ucjDYq2pGERzwpMliLIqJ001dg", function(json) {
      for (var i = 0; i < json.items.length; i++) {

        if ($('.checkout-container').find('*[data-id="' + json.items[i].id + '"]').length == 0) {

          $('.book-row').append($('<div></div>').attr('class', 'book-col')
            .append($('<div></div>').attr('class', 'book-box').attr('data-id', json.items[i].id).attr('data-price', json.items[i].saleInfo.retailPrice.amount)
              .append($('<h1></h1>').attr('class', 'book-title').text(json.items[i].volumeInfo.title))
              .append($('<div></div>').attr('class', 'row')
                .append($('<div></div>').attr('class', 'detail-col')
                  .append($('<img></img>').attr('class', 'img-fluid').attr('src', json.items[i].volumeInfo.imageLinks.thumbnail).attr('alt', 'cover'))
                )
                .append($('<div></div>').attr('class', 'detail-col')
                  .append($('<p></p>').attr('class', 'book-description').text((json.items[i].volumeInfo.description.length > 100) ? json.items[i].volumeInfo.description.substring(0, 100) + String.fromCharCode(8230) : json.items[i].volumeInfo.description.length))
                  // .append($('<button></button>').attr('class', 'btn-std btn-learn-more').attr('data-toggle', 'modal').attr('data-target', '#learnMore').text('Learn More ')
                  //   .append($('<i></i>').attr('class', 'far fa-ellipsis-h'))
                  // )
                  .append($('<div></div>').attr('class', 'price-container')
                    .append($('<p></p>').attr('class', 'book-price')
                      .text(JSON.stringify(json.items[i].saleInfo.retailPrice.amount))
                      .prepend($('<span></span>').attr('class', 'small').text('R$ '))
                    )
                  )
                )
              )
              .append($('<div></div>').attr('class', 'btn-wrap')
                .append($('<button></button>').attr('class', 'btn-std btn-cart btn-minus').text('-'))
                .append($('<button></button>').attr('class', 'btn-std btn-cart btn-add').text('Adicionar ao carrinho'))
                .append($('<button></button>').attr('class', 'btn-std btn-cart btn-plus').text('+'))
              )
            )
          );

        } else {

          $('.book-row').append($('<div></div>').attr('class', 'book-col')
            .append($('<div></div>').attr('class', 'book-box').attr('data-id', json.items[i].id).attr('data-price', json.items[i].saleInfo.retailPrice.amount)
              .append($('<h1></h1>').attr('class', 'book-title').text(json.items[i].volumeInfo.title))
              .append($('<div></div>').attr('class', 'row')
                .append($('<div></div>').attr('class', 'detail-col')
                  .append($('<img></img>').attr('class', 'img-fluid').attr('src', json.items[i].volumeInfo.imageLinks.thumbnail).attr('alt', 'cover'))
                )
                .append($('<div></div>').attr('class', 'detail-col')
                  .append($('<p></p>').attr('class', 'book-description').text((json.items[i].volumeInfo.description.length > 100) ? json.items[i].volumeInfo.description.substring(0, 100) + String.fromCharCode(8230) : json.items[i].volumeInfo.description.length))
                  // .append($('<button></button>').attr('class', 'btn-std btn-learn-more').attr('data-toggle', 'modal').attr('data-target', '#learnMore').text('Learn More ')
                  //   .append($('<i></i>').attr('class', 'far fa-ellipsis-h'))
                  // )
                  .append($('<div></div>').attr('class', 'price-container')
                    .append($('<p></p>').attr('class', 'book-price')
                      .text(JSON.stringify(json.items[i].saleInfo.retailPrice.amount))
                      .prepend($('<span></span>').attr('class', 'small').text('R$ '))
                    )
                  )
                )
              )
              .append($('<div></div>').attr('class', 'btn-wrap')
                .append($('<button></button>').attr('class', 'btn-std btn-cart btn-minus').attr('style', 'max-width: 25%;').text('-'))
                .append($('<button></button>').attr('class', 'btn-std btn-cart btn-add added').text($('.checkout-container').find('*[data-id="' + json.items[i].id + '"]').children().eq(1).text()))
                .append($('<button></button>').attr('class', 'btn-std btn-cart btn-plus').attr('style', 'max-width: 25%;').text('+'))
              )
            )
          );

        }

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

  // cart buttons
  $('.book-container').on('click', '.btn-add', function() {
    $(this).toggleClass('added');
    if ($(this).hasClass('added')) {
      $(this).text(1);
      $(this).parent().find('.btn-minus').animate({
        maxWidth: '25%'
      }, 300, function() {
        $(this).parent().find('.btn-plus').animate({
          maxWidth: '25%'
        }, 300);
      });
      $('.checkout-container').find('tbody')
        .prepend($('<tr></tr>').attr('data-id', $(this).parent().parent().attr('data-id')).attr('data-price', $(this).parent().parent().attr('data-price'))
          .append($('<td></td>').text($(this).parent().parent().parent().find('.book-title').text()))
          .append($('<td></td>').text(1))
          .append($('<td></td>').text($(this).parent().parent().attr('data-price')))
          .append($('<td></td>').attr('class', 'btn-remove').append($('<i></i>').attr('class', 'fal fa-times-circle')))
        );
      $('.checkout-container').find('.total').children().eq(2).text(parseFloat($('.checkout-container').find('.total').children().eq(2).text()) + parseFloat($(this).parent().parent().attr('data-price')));
    } else {
      $(this).parent().find('.btn-minus').animate({
        maxWidth: '0'
      }, 300, function() {
        $(this).parent().find('.btn-plus').animate({
          maxWidth: '0'
        }, 300, function() {
          $(this).parent().find('.btn-add').text('Adicionar ao carrinho');
          $('.checkout-container').find('.total').children().eq(2).text(parseFloat($('.checkout-container').find('.total').children().eq(2).text()) - parseFloat($('.checkout-container').find('*[data-id="' + $(this).parent().parent().attr('data-id') + '"]').children().eq(2).text()));
          $('.checkout-container').find('*[data-id="' + $(this).parent().parent().attr('data-id') + '"]').remove();
        });
      });
    }
  });
  $('.book-container').on('click', '.btn-plus', function() {
    $(this).parent().find('.btn-add').text(parseInt($(this).parent().find('.btn-add').text()) + 1);
    var book_cell = $('.checkout-container').find('*[data-id="' + $(this).parent().parent().attr('data-id') + '"]');
    book_cell.children().eq(1).text(parseInt(book_cell.children().eq(1).text()) + 1);
    book_cell.children().eq(2).text(parseInt(book_cell.children().eq(1).text()) * $(this).parent().parent().attr('data-price'));
    $('.checkout-container').find('.total').children().eq(2).text(parseFloat($('.checkout-container').find('.total').children().eq(2).text()) + parseFloat($(this).parent().parent().attr('data-price')));
  });
  $('.book-container').on('click', '.btn-minus', function() {
    if ($(this).parent().find('.btn-add').text() == '1') {
      $(this).parent().find('.btn-add').click();
    } else {
      $(this).parent().find('.btn-add').text(parseInt($(this).parent().find('.btn-add').text()) - 1);
      var book_cell = $('.checkout-container').find('*[data-id="' + $(this).parent().parent().attr('data-id') + '"]');
      book_cell.children().eq(1).text(parseInt(book_cell.children().eq(1).text()) - 1);
      book_cell.children().eq(2).text(parseInt(book_cell.children().eq(1).text()) * $(this).parent().parent().attr('data-price'));
      $('.checkout-container').find('.total').children().eq(2).text(parseFloat($('.checkout-container').find('.total').children().eq(2).text()) - parseFloat($(this).parent().parent().attr('data-price')));
    }
  });

  // checkout button
  $('.btn-checkout').click(function() {
    $('body').toggleClass('overflown');
    $('.checkout-container').slideToggle();
    $('.btn-checkout').toggleClass('d-none');
  });

  // remove button
  $('.checkout-container').on('click', '.btn-remove', function() {
    $('.book-container').find('*[data-id="' + $(this).parent().attr('data-id') + '"]').find('.btn-add').click();
    $(this).parent().children('td').animate({ padding: 0 }).wrapInner('<div />').children().slideUp();
  });

  // learn more click
  // var dataAquired = false;
  //
  // $('.book-container').on('click', '.btn-learn-more', function(e) {
  //   if (dataAquired) {
  //     dataAquired = false;
  //     return false;
  //   }
  //
  //   e.preventDefault();
  //
  //   $.getJSON("https://www.googleapis.com/books/v1/volumes/" + $(this).parent().parent().parent().attr('data-id') + "?key=AIzaSyCi2WxQ_ucjDYq2pGERzwpMliLIqJ001dg", function(json) {
  //     $('.modal-title').text(json.items[i].volumeInfo.title);
  //     $('.full-description').text(json.items[i].volumeInfo.description);
  //     $('.price').text(json.items[i].saleInfo.retailPrice);
  //     $('.author').text(json.items[i].volumeInfo.author);
  //     $('.id').text(json.items[i].id);
  //     $('.year').text(json.items[i].volumeInfo.publishedDate.substring(0, 4));
  //     $('.cover').text(json.items[i].volumeInfo.imageLinks.thumbnail);
  //   });
  //
  //   dataAquired = true;
  //   $(this).trigger('click');
  //
  // });

  // // modal add
  // $('.btn-add-modal').click(function() {
  //   $('.book-container').find('*[data-id="' + $(this).parent().parent().attr('data-id') + '"]').find('.btn-add').click();
  // });

});
