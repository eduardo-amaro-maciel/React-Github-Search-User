import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import style from "./Home.module.scss";
import githubLogo from "../../assets/svg/github-logo.svg";

type GitHubUser = {
   login: string;
   id: number;
   avatar_url: string;
   url: string;
   html_url: string;
   repos_url: string;
   name: string;
   location: string | null;
   email: string | null;
   bio: string | null;
   public_repos: number;
   followers: number;
   following: number;
};

type GithubUserRepository = {
   id: number;
   name: string;
   html_url: string;
   clone_url: string;
   language: string;
   watchers: number;
   forks: number;
   full_name: string;
   description: string | null;
};

export default function Home() {
   const [data, setData] = useState<GitHubUser>();
   const [repoData, setRepoData] = useState<GithubUserRepository[]>([]);
   const [searchValue, setSearchValue] = useState("");

   function handleChange(event: ChangeEvent<HTMLInputElement>) {
      const { value } = event.target;
      setSearchValue(value.replace(/ /g, ""));
   }

   const fetchUser = (searchValue = "eduardo-amaro-maciel") => {
      fetch(`https://api.github.com/users/${searchValue}`)
         .then((res) => res.json())
         .then((data) => {
            if (data.message) {
               alert("user not found 🙃");
            } else {
               setData(data);
               fetchRepo(searchValue);
            }
         });
   };

   const fetchRepo = async (searchValue = "eduardo-amaro-maciel") => {
      const res = await fetch(
         `https://api.github.com/users/${searchValue}/repos?per_page=100`
      );
      const data: GithubUserRepository[] = await res.json();
      const dataNew = data.sort(function (a, b) {
         return b.watchers - a.watchers;
      });
      setRepoData(dataNew);
   };

   useEffect(() => {
      fetchUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      fetchUser(searchValue);
   };

   return (
      <div className="layout">
         <div className={style.sidebar}>
            <img src={githubLogo} alt="github logo" />
            <ul>
               <li>
                  <a
                     href="https://github.com/marketplace"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23.723"
                        height="26.108"
                        viewBox="0 0 23.723 26.108"
                     >
                        <g transform="translate(0.25 0.25)">
                           <path
                              d="M23.676,12.011a3.365,3.365,0,0,0,2.671,1.333h.23a3.064,3.064,0,0,0,2.444-1.512A3.265,3.265,0,0,0,29.2,8.815L26.429,2.622A1.924,1.924,0,0,0,24.677,1.49H12.036a1.924,1.924,0,0,0-1.753,1.132L7.5,8.809a3.265,3.265,0,0,0,.187,3.017,3.064,3.064,0,0,0,2.444,1.512h.23A3.365,3.365,0,0,0,13.034,12,3.365,3.365,0,0,0,15.7,13.344a3.323,3.323,0,0,0,2.64-1.3,3.323,3.323,0,0,0,2.639,1.3A3.363,3.363,0,0,0,23.676,12.011Zm-4.968-.884a.4.4,0,0,0-.71,0,2.542,2.542,0,0,1-2.3,1.433,2.568,2.568,0,0,1-2.315-1.473.4.4,0,0,0-.715,0,2.568,2.568,0,0,1-2.315,1.473h-.177a2.283,2.283,0,0,1-1.819-1.13,2.473,2.473,0,0,1-.145-2.3l2.79-6.19a1.132,1.132,0,0,1,1.029-.665H24.669a1.132,1.132,0,0,1,1.029.665l2.782,6.19a2.473,2.473,0,0,1-.137,2.286,2.283,2.283,0,0,1-1.819,1.13h-.177a2.571,2.571,0,0,1-2.315-1.473.4.4,0,0,0-.715,0,2.568,2.568,0,0,1-2.312,1.473,2.542,2.542,0,0,1-2.3-1.423Z"
                              transform="translate(-6.902 -1.49)"
                              strokeWidth="0.5"
                           />
                           <path
                              d="M32.329,55.66a.4.4,0,0,0-.4-.4H24.242V48.626a.4.4,0,0,0-.792,0V55.66a.4.4,0,0,0,.4.4h8.087a.4.4,0,0,0,.4-.4Z"
                              transform="translate(-18.849 -35.893)"
                              strokeWidth="0.5"
                           />
                           <path
                              d="M7.576,56.593H8.56a.4.4,0,0,0,.4-.4V49.356a.4.4,0,1,0-.792,0V55.8H7.576a1.623,1.623,0,0,0,0,3.244H18.263a.4.4,0,1,0,0-.792H7.576a.831.831,0,0,1,0-1.66Z"
                              transform="translate(-6.018 -36.43)"
                              strokeWidth="0.5"
                           />
                           <path
                              d="M58.181,63.489h7.694a1.019,1.019,0,0,0,1.016-1.016V60.958a4.809,4.809,0,0,0-2.42-4.184,3.431,3.431,0,1,0-4.88,0,4.809,4.809,0,0,0-2.42,4.184v1.515A1.019,1.019,0,0,0,58.181,63.489Zm-.227-2.534a4.023,4.023,0,0,1,2.5-3.732.4.4,0,0,0,.074-.692,2.64,2.64,0,1,1,2.991,0,.4.4,0,0,0,.074.692A4.023,4.023,0,0,1,66.1,60.958v1.515a.227.227,0,0,1-.227.227H58.181a.227.227,0,0,1-.227-.227Z"
                              transform="translate(-43.668 -37.881)"
                              strokeWidth="0.5"
                           />
                        </g>
                     </svg>
                  </a>
               </li>
               <li>
                  <a
                     href="https://github.com/explore"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25.256"
                        height="25.244"
                        viewBox="0 0 25.256 25.244"
                     >
                        <g transform="translate(0.509 0.5)">
                           <g transform="translate(0 0)">
                              <path
                                 d="M68.579,62.735A12.134,12.134,0,1,0,70,61.52a12.752,12.752,0,0,0-1.419,1.215.268.268,0,0,0,.378.378,11.582,11.582,0,0,1,19.72,9.312,11.585,11.585,0,0,1-8.764,10.122A11.577,11.577,0,0,1,68.959,63.108C69.2,62.869,68.823,62.491,68.579,62.735Z"
                                 transform="translate(-65.036 -59.182)"
                                 strokeWidth="1"
                              />
                           </g>
                           <g transform="translate(10.902 10.91)">
                              <g transform="translate(0 0)">
                                 <path
                                    d="M471.759,466.2a1.237,1.237,0,0,0-.236,1.384,1.211,1.211,0,0,0,1.2.681,1.213,1.213,0,1,0-.966-2.066c-.25.239.131.62.378.378a.678.678,0,1,1-.081.864.683.683,0,0,1,.081-.864C472.378,466.334,472,465.953,471.759,466.2Z"
                                    transform="translate(-471.407 -465.849)"
                                    strokeWidth="1"
                                 />
                              </g>
                           </g>
                           <g transform="translate(5.02 5.032)">
                              <path
                                 d="M252.5,260.913c.325-.131.649-.263.971-.4l2.329-.95,2.814-1.148,2.39-.974c.365-.148.732-.3,1.095-.445.161-.067.2-.209.26-.354.086-.2.169-.41.255-.614.306-.735.609-1.47.915-2.205l1.159-2.8q.519-1.251,1.038-2.506c.188-.456.378-.912.566-1.368.008-.021.019-.043.027-.064a.269.269,0,0,0-.33-.33l-.958.4q-1.151.479-2.3.955l-2.809,1.164-2.425,1.006-1.2.5a.462.462,0,0,0-.255.311c-.078.188-.153.376-.231.566q-.439,1.078-.877,2.154-.571,1.4-1.14,2.8l-1.03,2.527q-.282.692-.566,1.384c-.008.021-.019.043-.027.064a.27.27,0,0,0,.188.33.275.275,0,0,0,.33-.188c.129-.319.26-.639.389-.958.311-.765.625-1.532.936-2.3l1.127-2.766q.491-1.2.979-2.4l.322-.789c.051-.126.113-.249.156-.378l.008-.016-.188.188c.322-.134.644-.268.966-.4.773-.322,1.548-.641,2.32-.963l2.809-1.164,2.428-1.006.794-.33c.126-.051.263-.1.384-.158l.016-.008-.33-.33c-.134.322-.268.644-.4.966q-.483,1.159-.963,2.321-.584,1.4-1.164,2.809l-1.006,2.428-.33.794c-.054.126-.115.252-.158.384l-.008.016.188-.188-.958.389-2.3.936-2.766,1.127-2.4.979c-.389.158-.781.317-1.17.478l-.016.008a.278.278,0,0,0-.188.33A.284.284,0,0,0,252.5,260.913Z"
                                 transform="translate(-252.149 -246.747)"
                                 strokeWidth="1"
                              />
                           </g>
                        </g>
                     </svg>
                  </a>
               </li>
            </ul>
         </div>
         <div className={style.content}>
            <form onSubmit={handleSubmit}>
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16.724"
                  height="16.734"
                  viewBox="0 0 16.724 16.734"
               >
                  <path
                     d="M26.846,25.451l-3-2.981a7.536,7.536,0,1,0-5.921,2.878,7.436,7.436,0,0,0,4.625-1.6l2.981,3.022a.9.9,0,0,0,.658.267.99.99,0,0,0,.658-.267A.918.918,0,0,0,26.846,25.451ZM23.6,17.824a5.685,5.685,0,1,1-1.665-4.009A5.629,5.629,0,0,1,23.6,17.824Z"
                     transform="translate(-10.4 -10.3)"
                     fill="#f5fac1"
                  />
               </svg>
               <input
                  value={searchValue}
                  onChange={handleChange}
                  placeholder="Search github user"
                  autoComplete="off"
                  type="search"
                  name="user"
               />
            </form>
            <div className="mobile-wrapper">
               <div className={style.profileWrapper}>
                  <div className={style.profileWrapper__profile}>
                     <img src={data?.avatar_url} alt="profile" />
                     <div>
                        <h1>
                           {data?.name?.split(" ")[0]} <br />{" "}
                           {data?.name?.split(" ")[1]}
                        </h1>
                        <p>{data?.login}</p>
                     </div>
                  </div>

                  {data?.bio && (
                     <div className={style.profileWrapper__bio}>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="38.936"
                           height="26.774"
                           viewBox="0 0 38.936 26.774"
                        >
                           <path
                              d="M-3.48-.754A11.761,11.761,0,0,1-5.643-7.805c0-6.847,3.985-12.774,12.865-16.351l1.252,1.942c-5.237,1.839-9.563,6.234-9.563,10.424a1.6,1.6,0,0,0,2.163,1.329,8.2,8.2,0,0,1,2.846-.511c4.326,0,7.969,2.555,7.969,6.745,0,3.986-3.643,6.847-7.969,6.847C.277,2.618-2,1.29-3.48-.754Zm21.289,0a11.761,11.761,0,0,1-2.163-7.051c0-6.847,4.1-12.774,12.979-16.351l1.138,1.942C24.64-20.375,20.2-15.981,20.2-11.791a1.6,1.6,0,0,0,2.163,1.329,8.718,8.718,0,0,1,2.846-.511c4.44,0,8.083,2.555,8.083,6.745,0,3.986-3.643,6.847-8.083,6.847C21.566,2.618,19.29,1.29,17.81-.754Z"
                              transform="translate(5.643 24.156)"
                              fill="#dbdbdb"
                              opacity="0.276"
                           />
                        </svg>
                        <p>{data?.bio}</p>
                     </div>
                  )}

                  <div className={style.profileWrapper__info}>
                     <div>
                        <h5>{data?.followers}</h5>
                        <p>Followers</p>
                     </div>
                     <div>
                        <h5>{data?.following}</h5>
                        <p>Following</p>
                     </div>
                     <div>
                        <h5>{data?.public_repos}</h5>
                        <p>Public repos</p>
                     </div>
                  </div>
               </div>
               <div className={style.repoWrapper}>
                  <h1>Popular repositories</h1>
                  <div className={style.repoContent}>
                     {repoData?.slice(0, 6).map((repo) => (
                        <a
                           href={repo.clone_url}
                           target="_blank"
                           rel="noopener noreferrer"
                           key={repo.id}
                           className={style.repo}
                        >
                           <ul className={style.repo__info}>
                              <li>{repo.language}</li>
                              <li>
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="9.534"
                                    height="9.302"
                                    viewBox="0 0 9.534 9.302"
                                 >
                                    <path
                                       d="M4.769,0A3.178,3.178,0,0,1,5.29.542c.342.641.628,1.315.987,1.946a.982.982,0,0,0,.591.417c.694.144,1.406.2,2.1.339a.79.79,0,0,1,.541.392.808.808,0,0,1-.2.647,18.124,18.124,0,0,1-1.45,1.411.866.866,0,0,0-.286.941c.136.64.257,1.287.33,1.938a.818.818,0,0,1-.2.648.788.788,0,0,1-.673.016c-.661-.3-1.285-.681-1.944-.984a.891.891,0,0,0-.665,0c-.644.3-1.251.67-1.9.961a.853.853,0,0,1-.72,0,.882.882,0,0,1-.186-.7c.075-.651.209-1.3.331-1.94a.792.792,0,0,0-.272-.844A15.477,15.477,0,0,1,.267,4.354.985.985,0,0,1,0,3.628c.035-.168.37-.344.6-.391.677-.139,1.371-.19,2.047-.332a.976.976,0,0,0,.581-.419c.353-.614.63-1.271.972-1.891A3.492,3.492,0,0,1,4.769,0Z"
                                       transform="translate(0.01)"
                                    />
                                 </svg>
                                 {repo.watchers}
                              </li>
                              <li>
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="6.837"
                                    height="10.259"
                                    viewBox="0 0 6.837 10.259"
                                 >
                                    <defs>
                                       <clipPath id="a">
                                          <rect
                                             width="6.837"
                                             height="10.259"
                                             transform="translate(0 0)"
                                          />
                                       </clipPath>
                                    </defs>
                                    <g clipPath="url(#a)">
                                       <path
                                          d="M1.931,5.7c.674-.248,1.344-.475,2-.741A1.614,1.614,0,0,0,4.91,3.3a.16.16,0,0,0-.072-.1A1.286,1.286,0,1,1,6.3,3.178a.207.207,0,0,0-.1.186,3.151,3.151,0,0,1-.643,1.925,3.194,3.194,0,0,1-1.435.985c-.441.163-.888.308-1.33.469a4.064,4.064,0,0,0-.477.217.747.747,0,0,0-.384.688.327.327,0,0,0,.149.327A1.275,1.275,0,0,1,1.3,10.259,1.278,1.278,0,0,1,.563,7.92a.158.158,0,0,0,.079-.151q0-2.642,0-5.284A.158.158,0,0,0,.56,2.337,1.282,1.282,0,1,1,2.5.875a1.3,1.3,0,0,1-.5,1.467.185.185,0,0,0-.079.122c0,1.064,0,2.128,0,3.192a.336.336,0,0,0,.007.043M1.924,1.276a.641.641,0,1,0-.642.647.636.636,0,0,0,.642-.647m3.627,1.5a.639.639,0,1,0-.637-.649.636.636,0,0,0,.637.649M1.284,9.62a.642.642,0,1,0-.643-.646.637.637,0,0,0,.643.646"
                                          transform="translate(0.001 0)"
                                       />
                                    </g>
                                 </svg>
                                 {repo.forks}
                              </li>
                           </ul>
                           <h5 className={style.repo__title}>
                              {repo.full_name.split("/")[1]}
                           </h5>
                           <p className={style.repo__details}>
                              {repo.description}
                           </p>
                        </a>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
