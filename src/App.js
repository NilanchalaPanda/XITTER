import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./styles.css";

// const initialFacts =
//   [
//     {
//       id: '1',
//       text: "React is being developed by Meta",
//       source: "https://www.linkedin.com/feed/",
//       category: "technology",
//       votesInteresting: 23,
//       votesMindBlowing: 23,
//       votesFalse: 2,
//       createdIn: 2022,
//     },
//     {
//       id: '2',
//       text: "I got 96 percentile in my MHTCET exam and I was one of the top studends",
//       source: "https://www.linkedin.com/feed/",
//       category: "personal",
//       votesInteresting: 23,
//       votesMindBlowing: 23,
//       votesFalse: 2,
//       createdIn: 2022,
//     },
//     {
//       id: '3',
//       text: "React is being developed by Meta",
//       source: "https://www.linkedin.com/feed/",
//       category: "technology",
//       votesInteresting: 23,
//       votesMindBlowing: 23,
//       votesFalse: 2,
//       createdIn: 2022,
//     },
//     {
//       id: '4',
//       text: "React is being developed by Meta",
//       source: "https://www.linkedin.com/feed/",
//       category: "technology",
//       votesInteresting: 23,
//       votesMindBlowing: 23,
//       votesFalse: 2,
//       createdIn: 2022,
//     }
//   ]

// ***************** MAIN APP *****************

function App() {
  // DEFINE STATE VARIABLE
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [currentCategory, setCurrentCategory ]= useState("all");

  useEffect(function () {
    async function getFacts() {

    let query = supabase.from('facts').select('*');

    if(currentCategory !== "all")
      query = query.eq("category", currentCategory);

      const { data: facts, } = await query.order("votesInteresting");
      setFacts(facts);
    } 
    getFacts();
  }, [currentCategory])

  return (
    <>
      {/* NAVBAR HEADER */}
      <HEADER showForm={showForm} setShowForm={setShowForm} />

      {/* FACT FORM */}
      {/* // USE STATE VARIABLE */}
      {showForm ? <NewFactForm setFacts={setFacts} setShowForm={setShowForm} /> : null}
      {/* <NewFactForm /> */}

      {/* MAIN CONTENT */}
      <div className="main">
        <CategoryFilter setCurrentCategory = {setCurrentCategory} />
        <FactsList facts={facts} />
      </div>

    </>
  );
}

// ################# HEADER #################

function HEADER({ showForm, setShowForm }) {
  const appTitle = "Today I Learned a FACT";
  return (
    <>
      <header className="header">
        <img src="logo.png" width="68" hei2ght="68" alt="Today I learnt a Fact" />
        <h1>{appTitle}</h1>
        {/* UPDATE STATE VARIABLE */}
        <button className="btn btn-large" onClick={() => setShowForm((show) => !show)}>  {showForm ? "Close" : "Share a FACT"} </button>
      </header>
    </>
  );
}

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

const CATEGORIES = [
  { id: 1, name: "technology", color: "#3b82f6" },
  { id: 2, name: "science", color: "#16a34a" },
  { id: 3, name: "finanace", color: "#ef4444" },
  { id: 4, name: "society", color: "#eab408" },
  { id: 5, name: "entertainment", color: "#db2777" },
  { id: 6, name: "health", color: "#14b8a6" },
  { id: 7, name: "history", color: "#f97316" },
  { id: 8, name: "news", color: "#8b5cf6" },
];

// ################# NEW FACT FORM #################

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  async function handleSubmit(e) {
    // 1) Prevent paging the load
    e.preventDefault();
    console.log(text, source, category);


    // 2) Check if data is Valid, then add it to the list
    if (source && isValidHttpUrl(source) && category && textLength <= 200) {
      console.log("Valid Data");

      // 3) Create new Fact object.
      // const newFact = {
      //   id: Math.round(Math.random * 1000000000),
      //   text,
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindBlowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // }

      // 3) Upload fact to supabase and update it on the UI
      const { data : newFact, error } = await supabase.from("facts").insert([{text, source, category}]).select();

      console.log(newFact); 

      // 4) Add the new Fact to the UI and also to the state
      // setFacts((facts) => [newFact[0], ...facts]);

      // 5) Reset input fields.
      setText("");
      setSource("");
      setCategory("");

      // 6) Close the form.
      setShowForm(false);
    }
    else {
      alert("Enter valid details to post the FACT !!")
    }
  }

  return (
    <>
      <form className="fact-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Share a FACT with the world..." value={text}
          onChange={(event) => { setText(event.target.value); }}
        />
        <span>{200 - textLength}</span>
        <input type="text" placeholder="Trustworthy source..." value={source}
          onChange={(e) => { setSource(e.target.value) }} />
        <select value={category} onChange={(e) => { setCategory(e.target.value) }} >
          <option value="">Choose Category :</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.name} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <button className="btn btn-large">POST</button>
      </form>
    </>
  );
}

// ################# CATEGORY FILTERS #################

function CategoryFilter({ setCurrentCategory }) {
  return (
    <>
      {/* CATEGORY FILTERS */}
      <ul>
        <li><button className="btn btn-large btn-categories" onClick={() => setCurrentCategory("all")}>All</button></li>
        {CATEGORIES.map((category) => (
          <li key={CATEGORIES.name}>
            <button className="btn btn-categories" onClick={() => setCurrentCategory(category.name)} style={{ backgroundColor: category.color }}> {category.name} </button>
          </li>
        ))}
      </ul>
    </>
  );
}

// ################# FACTS LISTS #################

function FactsList({ facts }) {

  if(facts.length === 0){
    return <h1> No facts for this category yet !! Create the first one NOW 💥</h1>
  };

  // let facts = Array.from(props.facts);

  // const [facts, setFacts] = useState(initialFacts)
  return (
    <>
      <section>
        <ul>
          {facts.map((fact) => (
            <Fact key={fact.id} fact={fact} />
          ))}
        </ul>
        <p>There are {facts.length} facts in the database. Add your OWN !! </p>
      </section>
    </>
  )
}

// ################# CHILD COMPONENT FOR FACTS LIST #################

function Fact({ fact }) {
  return (
    <li className="fact">
      < p >
        {fact.text}
        <a className="source" href={fact.source} target="_blank" rel="noreferrer" > (Source)</a>
      </p >
      <span className="tag">{fact.category}</span>
      <div className="vote-buttons">
        <button>👍🏻{fact.votesInteresting}</button>
        <button>🤯{fact.votesMindBlowing}</button>
        <button>⛔{fact.votesFalse}</button>
      </div>
    </li >
  );
}

export default App;
