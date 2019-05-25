export default function () {
    const categorySelect = function() {
        // let page = window.location.pathname.match(/(?<=page\/)\d+/);
        // page = page ? page[0] : 1;

        const val = $(this).val();
        const link = `${window.location.origin}/wp-json/ajax/news`;

        $.get(link, {
            constact_id: val
        }, function(data) {
            const container = $('#article-container');

            container.empty();

            for (let i = 0; i < data.posts.length; i++) {

                const article = data.posts[i];
                const articleBlock = $("div.article-preview").appendTo(container);
                const link = $(`a[href$='${article.link}']`).appendTo(articleBlock);

                link.append(`<h3>${article.title}</h3>`);
                articleBlock.append(`<p>${article.short_content}</p>`);

                const articleFooter = $("div.previev-footer").appendTo(articleBlock);
                const readMoreText = 'ПОДРОБНЕЕ';

                articleFooter.append(`
                    <p class="data">${article.date}</p>
                    <p class="tags">${article.categories}</p>
                    <button class="but">${readMoreText}</button>
                `);
            }
            // $('#pagination').remove();
            // $(data.pagination).insertAfter(container);
        });
    }

    $('#cat-selector').on('change', categorySelect());
}