let PostList1 = JSON.parse(localStorage.getItem("PostList1") || "[]");
console.log(PostList1);
document.addEventListener("DOMContentLoaded", () => {
  renderPostList();
});

// addToDO() function to do items to the list.
function addPost() {
  let content = document.querySelector("#content").value; // get input value from HTML through DOM query.
  let tagsInput = document.querySelector("#tags").value; // get input values from HTML through DOM query.
  let tags = tagsInput.split(",").map((tag) => tag.trim()); // split the input values by commas and remove empty space from each value, then saves as an array.

  //get local date and time
  const timeMade = new Date().toLocaleString([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  console.log(timeMade);

  let eachPost = {
    content: content,
    timeMade: timeMade,
    tags: tags,
    clicked: false,
  };

  // validates all fields must be field out for the post to be created
  if (!content || !tags) {
    alert("Please fill out all fields to post your cluck!");
  } else {
    // Get the updated todoList from local storage and push the added item to it.
    //todoList = JSON.parse(localStorage.getItem('todoList'));
    PostList1.push(eachPost);
    localStorage.setItem("PostList1", JSON.stringify(PostList1));
    console.log(PostList1);
    // Make the input field blank after adding the item.
    document.querySelector("#content").value = "";
    document.querySelector("#tags").value = "";

    // Call function to display the todoList once it gets added.
    renderPostList();
  }
}

function renderPostList() {
  let postListHTML = ""; // initialize a variable to store HTML which will later be displayed in the page.

  // Looping through the array of PostList to display all the items.
  for (let i = 0; i < PostList1.length; i++) {
    const eachPost = PostList1[i];
    const content = eachPost.content;
    //const author = eachPost.author;
    const date = eachPost.timeMade;
    const clicked = eachPost.clicked;
    let heartPic = clicked ? "heartRed.png" : "heartEmpty.png";
    const tags = Array.isArray(eachPost.tags) ? eachPost.tags : []; // makes sure that the "tags" variable is an array
    let tagsHTML = ""; // empties "tagshtml" array
    for (let i = 0; i < tags.length; i++) {
      // initializes html and css for each tag
      const tag = tags[i];
      tagsHTML += `<div class="tag">${tag}</div>`;
    }

    const html = `<div class="card mb-3"> 
                      <div class="card-body">
                         <div class="author-date-id">
                         <span class="profile-pic"><img class="profilepic d-none d-md-inline" src="dog.jpg"><p>@Minion 2</p></span>
                           <span class="author"></span> <span class="date mx-2 d-none d-md-inline">${date}</span>
                           </div>
                           <p class="card-text card-desc">${content}</p>
                           <div class="tags container-fluid">Tags:
                           ${tagsHTML}
                            </div>
                           <button class="btn-sm tweetbutton js-update">Update</button>
                          <button class="btn-sm tweetbutton js-delete">Delete</button>
                           <image class="heartIcon" src="${heartPic}" alt="empty heart icon" />
                      </div>
                    </div>
                         `;

    postListHTML += html;
  }

  document.querySelector(".post-list").innerHTML = postListHTML;
  // Event Listener for deleteButton to delete the Item once its clicked.
  document.querySelectorAll(".js-delete").forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", () => {
      let postDelete = JSON.parse(localStorage.getItem("PostList1")); // get the Updated todoList from Local storage.
      PostList1.splice(index, 1); // Deletes the item with index 'index'
      localStorage.setItem("PostList1", JSON.stringify(PostList1)); // Update local Storage .
      renderPostList(); // Call the function to display the changes.
    });
  });

  //Event Listener to like an image. The value of clicked is changed from false to true.
  document.querySelectorAll(".heartIcon").forEach((heart, index) => {
    heart.addEventListener("click", () => {
      const eachPost = PostList1[index];
      const clicked = eachPost.clicked;
      PostList1[index].clicked = !clicked;
      localStorage.setItem("PostList1", JSON.stringify(PostList1));
      renderPostList();
    });
  });

  // Event Listener for edit button to update the post content.
  document.querySelectorAll(".js-update").forEach((updateButton, index) => {
    updateButton.addEventListener("click", () => {
      const eachPost = PostList1[index];
      const content = eachPost.content;
      const tags = eachPost.tags;
      const postElement = updateButton.closest(".card-body");

      // display edit section or input fields with current post content
      const editSection = document.querySelector(".edit-section");
      editSection.style.display = "block";
      document.querySelector("#edit-content").value = content;
      document.querySelector("#edit-tags").value = tags;

      // handle update button click
      document.querySelector("#update-post").addEventListener("click", () => {
        const newContent = document.querySelector("#edit-content").value;
        const newTags = document.querySelector("#edit-tags").value.split(",");
        if (!newContent || !newTags) {
          alert("Please fill out all fields to complete your cluck!");
        } else {
          // update the post in local storage
          PostList1[index].content = newContent;
          PostList1[index].tags = newTags.map((tag) => tag.trim());
          localStorage.setItem("PostList1", JSON.stringify(PostList1));

          // close edit section and re-render the post list
          editSection.style.display = "none";
          renderPostList();
        }
      });
      // handle cancel button click
      document.querySelector("#cancel-edit").addEventListener("click", () => {
        editSection.style.display = "none";
      });
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
  allPostsSection.innerHTML = "";
  let tempPosts = JSON.parse(localStorage.getItem("PostList1"));
  console.log("search", tempPosts);
  console.log(searchTag);
  const result = tempPosts.filter((tempPosts) =>
    tempPosts.tags.includes(searchTag.toLowerCase())
  );
  console.log(result);

  let searchResultsHTML = "";
  for (let i = 0; i < result.length; i++) {
    const eachPost = result[i];
    const content = eachPost.content;
    // const author = eachPost.author;
    const date = eachPost.timeMade;
    //const tags = eachPost.tags;
    const clicked = eachPost.clicked;
    let heartPic = clicked ? "heartRed.png" : "heartEmpty.png";

    const tags = eachPost.tags;
    // makes sure that the "tags" variable is an array
    console.log("tags", tags);
    let tagsHTML = []; // empties "tagshtml" array
    for (let i = 0; i < tags.length; i++) {
      // initializes html and css for each tag
      const tag = tags[i];
      console.log(tag);

      tagsHTML += `<div class="tag">${tag}</div>`;
      console.log(tagsHTML);
    }
    const html = `<div class="card mb-3"> 
                      <div class="card-body">
                         <div class="author-date-id">
                         <span class="profile-pic"><img class="profilepic d-none d-md-inline" src="dog.jpg"><p>@Minion 2</p></span>
                            <span class="date mx-2 d-none d-md-inline">${date}</span>
                           <p class="card-text card-desc">${content}</p>
                          
                            ${tagsHTML}
                           <button class="btn-sm tweetbutton js-update">Update</button>
                          <button class="btn-sm tweetbutton js-delete">Delete</button>
                            <image class="heartIcon" src="${heartPic}" alt="empty heart icon" />
                      </div>
                    </div>
                         `;

    searchResultsHTML += html;
  }

  searchPostSection.innerHTML = searchResultsHTML;
});

function signOut(event) {
  event.preventDefault();

  window.location.replace("index.html");
}
