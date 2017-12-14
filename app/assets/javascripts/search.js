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
eg.setGenre('001001012');
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

// ソート検索関数
function sortSearch(sort, page, check) {
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
};

// 作者検索関数
function authorSearch(author, page, check) {
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
};

// タイトル検索関数
function titleSearch(title, page, check) {
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
function genreSearch(genreId, page, check) {
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
};

// ISBN 検索関数
function isbnSearch(isbn, check) {
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
        bd.setBooks(data[i],i);
        tb.setTopBook(bd.getBooks(i));
    }).fail(function(data){
        $('#out').html('<p>Failure</p>');
    });
};

// 取得した書籍データを html に整形して出力する
function outBooks(data, check) {

    if(check === 0 || check !== 1) {
        $('#photos_6').html(null);
        bd.reset();
        ig.reset();
    };

    $.each(data, function(i) {

        bd.setBooks(data[i]);
        var id = ig.getId();
        var url = bd.getUrl(id);
        var img = bd.getImg(id);
        var genre = bd.getGenreId(id);

        var excep = eg.checkGenre(genre);
        var noImg = img.match(/noimage/);
        if (noImg === null && excep !== 1) {
            var list = '<span class="iconBuyButton">'
                + '<img id="' + id + '" '
                + 'src="' + img + '"> '
                + '<a href="'+ url + '" '
                + 'target="_blank">'
                + '<i class="fa fa-shopping-cart fa-fw fa-border" aria-hidden="true"></i>'
                + '</a>'
                + '</span>';
            $("#photos_6").append(list);
        };
    });
    // ローディング画像削除
    $('#top_loading').html(null);
    $('#end_loading').html(null);
};
