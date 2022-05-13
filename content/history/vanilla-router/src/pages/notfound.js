function NotFound($container) {
  this.$container = $container;

  this.setState = () => {
    this.render();
  };

  this.render = () => {
    this.$container.innerHTML = `
      <main class="notFoundPage">
        404 NOT FOUND
      </main>
    `;
  };

  this.render();
}

export default NotFound;
