import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticle, setAllArticle] = useState([]);

  const [copied, setCopied] = useState("");
  const [getSummary, { isFetching, error }] = useLazyGetSummaryQuery();
  // console.log(error);
  // console.log(isFetching);

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticle(articlesFromLocalStorage);
    }
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({
      articleUrl: article.url,
    });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticle];
      setArticle(newArticle);
      setAllArticle(updatedAllArticles);
      // checking wheather the data is coming or not
      // console.log(newArticle);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
    // console.log(data);
  };
  const handelCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <section className="mt-16 w-full max-w-full">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handelSubmit}
        >
          <img
            src={linkIcon}
            alt="link_svg"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) =>
              setArticle({
                ...article,
                url: e.target.value,
              })
            }
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>
        {/* Browser URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticle.map((items, index) => (
            <div
              className="link_card"
              key={`link-${index}`}
              onClick={() => setArticle(items)}
            >
              <div className="copy_btn" onClick={() => handelCopy(items.url)}>
                <img
                  src={copied === items.url ? tick : copy}
                  className="w-[40%] h-[40%] object-contain"
                  alt=""
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {items.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Display Results */}
      <div className="my-10 max-w-full  flex justify-center items-center">
        {isFetching ? (
          <img src={loader} className="w-20 h-20 object-contain" alt="" />
        ) : error ? (
          <p className="font-inter  font-bold text-black text-center">
            Well, That wasn't supposed to happen...
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3 ">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
