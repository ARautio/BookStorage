<script language="typescript">
  export let book;
</script>

<div class="lg:w-1/4 md:w-1/2 p-4 w-full">
  <div class="block relative h-80 rounded overflow-hidden">
    <img
      alt={book.coverFilename}
      class="object-cover object-center w-full h-full block"
      src="http://localhost:8000/assets/covers/{book.coverFilename}"
    />
  </div>
  <div class="mt-4">
    <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
      {book.creator}
    </h3>
    <h2 class="text-gray-900 title-font text-lg font-medium">{book.title}</h2>

    <p class="mt-1">
      <a href="http://localhost:8000/assets/books/{book.filename}">Download</a>
    </p>
  </div>
</div>

<style>
  img {
    width: 100%;
  }
</style>
