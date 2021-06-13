import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import ArticleDetail from "../news/articleDetails";
import Headlines from "../news/headlines";
import React from "react";
import IArticle from "../news/newsTypes";

type ContextProps = {
    setSelectedArticle?: (data: IArticle) => void,
    selectedArticle?: IArticle | null
};
export const ArticleContext = React.createContext<ContextProps>({});

export default function AppRoutes() {
    let [selectedArticle, setArticle] = React.useState<IArticle | null>(null);

    return (
        <BrowserRouter>
            <Switch>
                <ArticleContext.Provider value={{
                    setSelectedArticle: (article: IArticle) => setArticle(article),
                    selectedArticle
                }}>
                    <Route path={"/"} exact>
                        {/*Headlines component takes country name and code to show the results*/}
                        <Headlines country={{name: "United Kingdom", code: "gb"}}/>
                    </Route>
                    <Route path={"/articleDetail"} exact>
                        {/*on page refresh user will be redirected to home page where headlines can be seen*/}
                        {selectedArticle ?
                        <ArticleDetail/>:
                            <Redirect to={"/"} />
                        }
                    </Route>
                </ArticleContext.Provider>
                <Route path={"*"}>
                    <>
                        <h1>404</h1>
                        <h4>Page Not Found</h4>
                    </>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}