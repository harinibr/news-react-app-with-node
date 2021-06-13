import React from "react";
import { NavLink} from "react-router-dom";
import "./headlines.scss";
import IArticle from "./newsTypes";
import loaderIcon from "./../assets/images/loader.gif";
import {ArticleContext} from "../routing/appRouter";
import {urlConfig} from "../config";

interface IHeadlineProps {
    country: { name: string, code: string }
}

export default function Headlines(props: IHeadlineProps) {
    //context api used to fetch the selected article from headlines

    const articleContext = React.useContext<{
        setSelectedArticle?: (data: IArticle) => void,
        selectedArticle?: IArticle | null
    }>(ArticleContext);
    //state variable user to set article list
    const [articles, setArticles] = React.useState<Array<IArticle>>([]);

    //loader to show API pending state - backend process
    const [loader,setLoader] = React.useState<boolean>(false);

    React.useEffect(() => {
        //shows loader until API status is in pending state
        setLoader(true);
        //holds country code
        const cc = props.country.code;

        //api call to fetch news headlines
        const resp = async () => await fetch(`${urlConfig.apiBaseUrl}api/news/${cc}`);
        resp()
            .then(res => res.json())
            .then((res:{
                data:{
                    articles:Array<IArticle>
                }
            }) => {
                setArticles(res.data.articles);
                setLoader(false);
            })
            .catch(e => console.log(e));
    }, [props.country.code]);

    return (
        <section className={"newsHeadLines"}>
            <h1 className={"heading"}>{props.country.name} news headlines</h1>
            {
                loader && <>
                    <img src={loaderIcon} alt={"loader"} width={"20px"} height={"20px"} />
                </>
            }
            <ul>
                {articles.map((article: IArticle, i: number) =>
                    <li key={i} onClick={()=>articleContext.setSelectedArticle && articleContext.setSelectedArticle(article)}>
                       <div className={"articleLinkDiv"}>
                           <label>--</label>
                           <NavLink to={"/articleDetail"} className={"navLinkToArticle"}>
                               <label>  {article.title}</label>
                               <span className={"author"}>by <i>{article.author}</i></span>
                           </NavLink>
                       </div>

                    </li>
                )}
                {!loader && !articles.length && (
                    <h4>No latest headlines</h4>
                )}
            </ul>
        </section>
    )
}