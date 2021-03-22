function onScroll() {
  if (
    window.pageYOffset + document.documentElement.clientHeight >
    document.documentElement.scrollHeight - 300
  ) {
    if (hasMorePost && !loadPostsLoading) {
      const lastId = posts[posts.length - 1]?.id;

      dispatch({
        type: POST.LOAD_POSTS_REQUEST,
        lastId,
        data: category,
      });
    }
  }
}

export default onScroll;
