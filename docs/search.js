let searchTag = document.querySelector(".search-tag")
let PostList

searchTag.addEventListener("input", e => {
    let value = e.target.value.toLowerCase()
    for (let i = 0; i < PostList.length; i++){
        let postListings = PostList[i];
        let isVisible = postListings.tag.toLowerCase().includes(value)
        postListings.element.classList.toggle('hide', !isVisible)
    }
})



