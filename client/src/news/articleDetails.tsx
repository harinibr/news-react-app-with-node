import React from "react";
import IArticle from "./newsTypes";
import {ArticleContext} from "../routing/appRouter";
import "./articleDetail.scss";

function ArticleDetail() {
    const articleContext = React.useContext<{
        setSelectedArticle?: (data: IArticle) => void,
        selectedArticle?: IArticle | null
    }>(ArticleContext);

    const selectedArticle: IArticle | null = articleContext.selectedArticle ? articleContext.selectedArticle : null;
    const publishDate = new Date(selectedArticle?.publishedAt.toString()||"").toLocaleDateString("gb");

    //article details

    return (
        <section className={"articleDetails"}>
            {selectedArticle &&
            <>
                {/*article title*/}
                <h1 className={"articleTitle"}>{selectedArticle?.title}</h1>
                {/*article source and publish details*/}
                <div className={"moreDetails"}>

                    <i>
                        Source {selectedArticle.source.name}
                    </i>
                    <i>
                        Published by {selectedArticle?.author} on {publishDate.toString()}
                    </i>
                </div>
                <p className={"articleContent"}>{selectedArticle?.description}</p>
                <img  className={"articleImage"} src={selectedArticle?.urlToImage} alt={"Article"}/>

                <br />
                <br />
                {/*article content for more details user can be redirected to original article*/}
                <div>
                    {selectedArticle?.content?.split("…")[0]+"..."} <a  rel="noreferrer"  target={"_blank"} href={selectedArticle?.url} className={"articleLink"}>Continue reading</a>

                </div>
            </>
            }
        </section>
    )
}

export default ArticleDetail;