export interface Api {
    id: number;
    key: string;

}

export interface Country {
    code: string;
    name: string;
    flag: string;
}

export interface Countries {
    list: Country[]
}

export interface NewsArticle {
    source: string;
    author: string;
    title: string;
    description: string;
    article_url: string;
    image_url: string;
    published_time: string;
    content: string;
}

export interface NewsArticles {
    newsArticles: NewsArticle[]
}