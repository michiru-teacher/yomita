# coding: utf-8
class HomeController < ApplicationController

  def sortSearch
    data = RakutenWebService::Books::Book.search(sort: params[:sort],
                                                 page: params[:page],
                                                 hits: params[:hits],
                                                 availability:1,)
    render json: data
  end

  def titleSearch
    data = RakutenWebService::Books::Book.search(title: params[:title],
                                                 page: params[:page],
                                                 hits: params[:hits],
                                                 availability:1)
    render json: data
  end

  def authorSearch
    data = RakutenWebService::Books::Book.search(author: params[:author],
                                                 page: params[:page],
                                                 hits: params[:hits],
                                                 availability:1)
    render json: data
  end

  def genreSearch
    data = RakutenWebService::Books::Book.search(booksGenreId: params[:booksGenreId],
                                                 page: params[:page],
                                                 hits: params[:hits],
                                                 availability:1)
    render json: data
  end

  def isbnSearch
    data = RakutenWebService::Books::Book.search(isbn: params[:isbn],
                                                 hits: params[:hits])
    render json: data
  end

  def index

    if cookies[:ISBN].blank?
      cookies[:ISBN]="tmp"
    end
    tmp21 = cookies[:ISBN].split('&')
    tmp21.delete('tmp')
    tmp21.uniq!
    gon.isbn=tmp21

    if cookies[:image].blank?
      cookies[:image] = ["tmp"]
      p '🔴  cookiesを初期化したよ。'
    elsif params[:img] != nil
      tmp20 = cookies[:image].split('&')
      tmp20.delete('tmp')
      #cookies[:Receivefruit] = ["a"]
      tmp20.push(params[:img])
      tmp20.uniq!
      #cookies[:image]=cookies[:image].split('&').push(params[:img]).uniq!
      cookies[:image]=tmp20
      gon.image=tmp20
      p '🔴  cookiesに追加したよ。'
      p cookies[:image]
      #cookies[:Receivefruit] = []
    end

    if cookies[:ISBN].blank?
      cookies[:ISBN] = ["tmp"]
      p '🔴  cookies[:isbn]を初期化したよ。'
      p cookies[:ISBN]
    elsif params[:ISBN1] != nil
      tmp21 = cookies[:ISBN].split('&')
      tmp21.delete('tmp')
      tmp21.push(params[:ISBN1])
      tmp21.uniq!
      cookies[:ISBN]=tmp21
      gon.isbn=tmp21
      p '🔵  cookies[:isbn]に追加したよ。'
      p cookies[:ISBN]
    end

    p '-------------------------------------------------------------------------------------------------------------'
    p 'cookies[:image]を表示します'
    p cookies[:image]

    gon.clorets = session[:sumikko]
    p '-------------------------------------------------------------------------------------------------------------'
    p 'gon.cloretsを表示します'
    p gon.clorets
    p '-------------------------------------------------------------------------------------------------------------'

    #セッション初期化処理
    if params[:number]
      p '🔴 cookiesを初期化したよ'
      cookies[:ISBN] = ["tmp"]
      cookies[:image]=["tmp"]
      p cookies[:ISBN]
      p cookies[:image]
    end

  end

  def defcDelete
    tmp31 = cookies[:ISBN].split('&')
    tmp32 = cookies[:image].split('&')
    p '🔴 元々の配列'
    p tmp31
    p tmp32
    p '🔴 探すISBN'
    p params[:cDeleteN]
    indexN = tmp31.index(params[:cDeleteN])
    p '🔴 指定した番地'
    p indexN
    tmp31.delete_at(indexN)
    tmp32.delete_at(indexN)
    cookies[:ISBN]=tmp31
    cookies[:image]=tmp32
    p '🔴 個別削除したよ'
    p cookies[:ISBN]
    p cookies[:image]
  end


  def history

    #セッション初期化処理
    if params[:number]
      session[:Receivefruit] = nil
    end

    if session[:Receivefruit].blank?
      session[:Receivefruit] = ["tmp"]
      session[:Receivefruit][0] = params[:img]
      p '🔴  sessionを初期化したよ。'
    else
      #session[:Receivefruit] = ["a"]
      session[:Receivefruit][session[:Receivefruit].length]= params[:img]
      p '🔴  sessionに追加したよ。'
      p session[:Receivefruit]
      #session[:Receivefruit] = []
    end
    gon.history_list = session[:Receivefruit]
    p '🔵'
    p session[:Receivefruit]
    p '通ります'

    session[:alt] = []
    session[:alt] = 'alt'


    #session[:BookData] = []
    session[:BookData][1] = {title: params[:title],author: params[:author], caption: params[:caption], img: params[:img]}
    p session[:BookData][:title]
  end


end
