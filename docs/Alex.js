document.addEventListener("DOMContentLoaded", () => {
    const postForm = document.getElementById("post-form")
    const searchInput = document.getElementById("search")
    const feedBox = document.getElementById("feedBox")

   
    
    postForm.addEventListener("submit", createPost)
    feedBox.addEventListener("click", getDelete)
    searchInput.addEventListener("keyup", searchPosts)

    function createPost(event){
    event.preventDefault()

    const author = document.getElementById("author").value.trim()
    const content = document.getElementById("content").value.trim()
    const tags = document.getElementById("tags").value
    const timeMade = new Date().toLocaleString()

    if (!author || !content) {
        alert("Please fill in all required fields.")
        return
    }

    

    const post = { author, content, tags, timeMade }
    savePost(post)

    postForm.reset()
    showPost()
}

function showPost() {
    const posts = getPosts()
    feedBox.innerHTML = ""

    posts.forEach((post, index) => {
        const newPost = document.createElement("li")
        newPost.innerHTML = `
        <div class="author-timeMade-id"><span class="author">${post.author}</span><span class="timeMade">
            <p>${post.timeMade}</p></span><span class="id"><p>1</p></span></div>
            <p class="card-text card-desc">${post.content}</p>
            <ul class="tags"><p class="tag-label">Tags: </p>
                <li class="keywords">${post.tags}</li>
            </ul>
            <button data-index="${index}" class="edit">Edit</button>
            <button data-index="${index}" class="delete">Delete</button>
        </div>
        `
        feedBox.appendChild(newPost)
    })
}

function getDelete(event) {
    if (event.target.classList.contains("edit")) {
        editPost(event.target.dataset.index)
    } else if (event.target.classList.contains("delete")) {
        deletePost(event.target.dataset.index)
    }
}

function deletePost(index) {
    const posts = getPosts()
    posts.splice(index, 1)
    setPosts(posts)
    showPost()
}

function searchPosts(event) {
    const keyword = event.target.value.trim().toLowerCase()
    const posts = getPosts().filter(post => post.tags.some(tag => tag.toLowerCase().includes(keyword)))
    showSearch(posts)
}

function showSearch(posts) {
    feedBox.innerHTML = ""

    posts.forEach((post, index) => {
        const newPost = document.createElement("li")
        newPostd.innerHTML = `
        <div class="author-timeMade-id"><span class="author">${post.author}</span><span class="timeMade">
            <p>${post.timeMade}</p></span><span class="id"><p>1</p></span></div>
            <p class="card-text card-desc">${post.content}</p>
            <ul class="tags"><p class="tag-label">Tags: </p>
                <li class="keywords">${post.tags}</li>
            </ul>
            <button data-index="${index}" class="edit">Edit</button>
            <button data-index="${index}" class="delete">Delete</button>
        </div>
        `
   
        feedBox.appendChild(newPost)
    })
}

//Local storage stuff
function getPosts() {
    return JSON.parse(localStorage.getItem("posts")) || []
}

function setPosts(posts) {
    localStorage.setItem("posts", JSON.stringify(posts))
}

function savePost(post, index = null) {
    const posts = getPosts()

    if (index === null) {
        posts.push(post)
    } else {
        posts[index] = post
    }

    setPosts(posts)
}

showPost()
})

