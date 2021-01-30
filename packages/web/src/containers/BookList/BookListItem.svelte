<script language="typescript">
  export let book;
</script>

<li>
  <img
    src="http://localhost:8000/assets/covers/{book.coverFilename}"
    alt="Cover"
  />

  <a href="http://localhost:8000/assets/books/{book.filename}"
    >{book.creator} - {book.title}</a
  >
</li>

<style>
  img {
    width: 100px;
  }
</style>
