const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch('YCKHLSFKK2', 'b26d0260f0c55b7158d81cdf453b38dd');

const search = instantsearch({
  indexName: 'movie',
  searchClient,
  future: { preserveSharedStateOnUnmount: true },
  
});


search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: (hit, { html, components }) => html`
<article>
  <img src=${ hit.backdrop_path } alt=${ hit.original_title } />
  <div>
    <h1>${components.Highlight({hit, attribute: "original_title"})}</h1>
    <p>${components.Highlight({hit, attribute: "release_date"})}</p>
    <p>${components.Highlight({hit, attribute: "original_language"})}</p>
  </div>
</article>
`,
    },
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();

