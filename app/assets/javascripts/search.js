// ソート検索関数
function sortSearch(sort, page, check)
{
    return $.ajax({
        url: '/home_sortSearch',
        type: 'GET',
        dataType: 'json',
        async: true,
        data: {
            sort: sort,
            hits: 30,
            page: page
        }
    }).done(function(data){
        outBooks(data, check);
    }).fail(function(data){
        $('#out').html('<p>Failure</p>');
    });
}

// 作者検索関数
function authorSearch(author, page, check)
{
    return $.ajax({
        url: '/home_authorSearch',
        type: 'GET',
        dataType: 'json',
        async: true,
        data: {
            author: author,
            hits: 30,
            page: page
        }
    }).done(function(data){
        outBooks(data, check);
    }).fail(function(data){
        $('#out').html('<p>Failure</p>');
    });
}

// タイトル検索関数
function titleSearch(title, page, check)
{
    return $.ajax({
        url: '/home_titleSearch',
        type: 'GET',
        dataType: 'json',
        async: true,
        data: {
            title: title,
            hits: 30,
            page: page
        }
    }).done(function(data){
        outBooks(data, check);
    }).fail(function(data){
        $('#out').html('<p>Failure</p>');
    });
}

// ジャンル検索関数
function genreSearch(genreId, page, check)
{
    return $.ajax({
        url: '/home_genreSearch',
        type: 'GET',
        dataType: 'json',
        async: true,
        data: {
            booksGenreId: genreId,
            hits: 30,
            page: page
        }
    }).done(function(data){
        outBooks(data, check);
    }).fail(function(data){
        $('#out').html('<p>Failure</p>');
    });
}

// ISBN 検索関数
function isbnSearch(isbn, check)
{
    return $.ajax({
        url: '/home_isbnSearch',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: {
            isbn: isbn,
            hits: 1
        }
    }).done(function(data){
        var i = 0;
        bd.reset();
        ig.reset();
        bd.setBooks(getBook(data[i]));
        tb.setTopBook(bd.getBooks(i));
    }).fail(function(data){
        $('#out').html('<p>Failure</p>');
    });
}

// 取得した書籍データを html に整形して出力する
function outBooks(data, check)
{
    console.log(data);
    if(check === 0 || check !== 1) {
        $('#photos_6').html(null);
        bd.reset();
        ig.reset();
    };

    $.each(data, function(i) {
        var book = getBook(data[i]);
        bd.setBooks(book);
        var id = ig.getId();
        var url = book.url;
        var img = book.img;
        var genre = book.genreId;
        var isbn = book.isbn;

        var excep = eg.checkGenre(genre);
        var excep_isbn = eg.checkGenre(isbn);
        var noImg = img.match(/noimage/);
        if (noImg === null && excep !== 1 && excep_isbn !== 1) {
            /*
              var list = '<span class="iconBuyButton">'
              + '<img id="' + id + '" '
              + 'src="' + img + '"> '
              + '<a href="'+ url + '" '
              + 'target="_blank">'
              + '<i class="fa fa-shopping-cart fa-fw fa-border" aria-hidden="true"></i>'
              + '</a>'
              + '</span>';
            */

            var list = '<span class="iconBuyButton">'
                + '<img id="' + id + '" '
                + 'src="' + img + '"> '
                + '<a href="https://www.amazon.co.jp/s/ref=nb_sb_noss?__mk_ja_JP=カタカナ&url=search-alias%3Dstripbooks&field-keywords='+ isbn + '" '
                + 'target="_blank">'
                + '<i class="fa fa-shopping-cart fa-fw fa-border" aria-hidden="true"></i>'
                + '</a>'
                + '</span>';

            $("#photos_6").append(list);
        };
    });
    // ローディング画像削除
    //sleep(1000);
    $('#top_loading').html(null);
    $('#end_loading').html(null);
    //$('#photos_6').css('display','block');
};

function getBook(data)
{
    data = data.params;

    var book = {
        url: data.itemUrl,
        img: data.largeImageUrl,
        title: data.title,
        author: data.author.split('/', 1),
        genreId: data.booksGenreId.split('/', 1),
        caption: data.itemCaption,
        isbn: data.isbn
    };

    return book;
}

const eg = new excepGenre();
// 写真集
eg.setGenre('001013');
// エンタメ/フィギュア
eg.setGenre('001011010');
// 電子ブック
eg.setGenre('001024');
// 旅行・留学・アウトドア
eg.setGenre('001007');
// パソコン・システム開発
eg.setGenre('001005');

// 資格・検定
eg.setGenre('001016');
// エンタメ・ゲーム/タレント関連本
eg.setGenre('001011013');
// 漫画/青年
eg.setGenre('001001003');
// 文庫/写真集
eg.setGenre('001019014');

// その他
eg.setGenre('001015');

// 漫画/その他
//eg.setGenre('001001012');

//危ない本
//姉ちゃん（泥酔中）と、気持ちイイこと
//https://books.rakuten.co.jp/rb/15179511/
eg.setGenre('9784434238413');
//女子落ちっ！　2階からエロ娘が降ってきて、オレのアレに！？
//https://books.rakuten.co.jp/rb/15203529/
eg.setGenre('9784434239335');



// 語学・学習参考書/その他
eg.setGenre('001002007');
// 絵本・児童書・図鑑/その他
eg.setGenre('001003007');
// 小説・エッセイ/その他
eg.setGenre('001004015');
// ビジネス・経済・就職/その他
eg.setGenre('001006021');
// 人文・思想・社会/その他
eg.setGenre('001008027');
// ホビー・スポーツ・美術/その他
eg.setGenre('001009014');
// 美容・暮らし・健康・料理/その他
eg.setGenre('001010015');
// エンタメ・ゲーム/その他
eg.setGenre('001011012');
// 科学・医学・技術/その他
eg.setGenre('001012016');
// ライトノベル/その他
eg.setGenre('001017004');
// 文庫/その他
eg.setGenre('001019015');
// 新書/その他
eg.setGenre('001020014');
// ボーイズラブ/その他
eg.setGenre('001021003');

// 本 > カレンダー・手帳・家計簿 > 手帳
eg.setGenre('001026002');
// 本 > ビジネス・経済・就職 > 自己啓発 > 情報管理・手帳
eg.setGenre('001006009004');
// 本 > カレンダー・手帳・家計簿 > カレンダー
eg.setGenre('001026001');
// 本 > エンタメ・ゲーム > 音楽 > その他
eg.setGenre('001011003003');
// 本 > ホビー・スポーツ・美術 > 格闘技 > 格闘技写真集
eg.setGenre('001009002005');
// 本 > エンタメ・ゲーム > 演劇・舞踊 > 演劇
eg.setGenre('001011006001');
