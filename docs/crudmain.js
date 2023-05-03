let PostList = JSON.parse(localStorage.getItem("PostList") || "[]");
console.log(PostList);
renderPostList();

// addToDO() function to do items to the list.
function addPost() {
  let content = document.querySelector("#content").value; // get input value from HTML through DOM query.
  let author = document.querySelector("#author").value; // get input value from HTML through DOM query.
  let tags = document.querySelector("#tags").value; // Save it as an object.

  const date = Date.now();
  const timeMade = new Date(date);
  console.log(timeMade);

  let eachPost = {
    content: content,
    timeMade: timeMade,
    author: author,
    tags: tags,
  };

  // Get the updated todoList from local storage and push the added item to it.
  //todoList = JSON.parse(localStorage.getItem('todoList'));
  PostList.push(eachPost);
  localStorage.setItem("PostList", JSON.stringify(PostList));
  console.log(PostList);
  // Make the input field blank after adding the item.
  document.querySelector("#content").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#tags").value = "";

  // Call function to display the todoList once it gets added.
  renderPostList();
}

function renderPostList() {
  let postListHTML = ""; // initialize a variable to store HTML which will later be displayed in the page.

  // Looping through the array of PostList to display all the items.
  for (let i = 0; i < PostList.length; i++) {
    const eachPost = PostList[i];
    const content = eachPost.content;
    const author = eachPost.author;
    const date = eachPost.timeMade;
    const tags = eachPost.tags;
    const html = `<div class="card mb-3"> 
                      <div class="card-body">
                         <div class="author-date-id">
                           <span class="author">${author}</span> <span class="date mx-2">${date}</span>
                           <span class="id ">ID:</span></div>
                           <p class="card-text card-desc">${content}</p>
                           <div class="tags container-fluid">Tags:<p class="tag-label keywords mr-3">
                            ${tags}</p></div>
                           <button class="btn-sm tweetbutton js-update">Update</button>
                          <button class="btn-sm tweetbutton js-delete">Delete</button>
                      </div>
                    </div>
                         `;

    postListHTML += html;
  }

  document.querySelector(".post-list").innerHTML = postListHTML;
  // Event Listener for deleteButton to delete the Item once its clicked.
  document.querySelectorAll(".js-delete").forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", () => {
      let postDelete = JSON.parse(localStorage.getItem("PostList")); // get the Updated todoList from Local storage.
      PostList.splice(index, 1); // Deletes the item with index 'index'
      localStorage.setItem("PostList", JSON.stringify(PostList)); // Update local Storage .
      renderPostList(); // Call the function to display the changes.
    });
  });
}

// Event Listener for Cluck button which calls the addPost() function when clicked.
document.querySelector("#createPost").addEventListener("click", () => {
  addPost();
  // localStorage.setItem('todoList', JSON.stringify(todo));
});

let searchPosts = function (search) {
  //event.preventDefault();
  console.log("Search button clicked", search);
};

// Event Listener for Search button which calls the searchPosts() function when clicked.

let searchButton = document.querySelector(".searchBtn");
let allPostsSection = document.querySelector(".js-posts");
let searchPostSection = document.querySelector(".js-search-results");

searchButton.addEventListener("click", () => {
  let searchTag = document.querySelector(".search-tag").value;
  searchPosts(searchTag);
  allPostsSection.innerHTML = "";
  searchPostSection.innerHTML = `<p>${searchTag}</p>
                                    <hr>`;
});
