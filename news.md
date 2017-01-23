---
layout: small
title: News
---
<div id="main">
<div id="editable">
<div class="mz_component mz_wysiwyg mz_editable"> <div class="moze-wysiwyg-editor">
<h1>News</h1>
<section>
  <div class="container">
    <div class="row">
      <div class="text-center">
        <ul style="list-style-type:none">
          {% for post in site.posts %}
            <li>
              <h2><a href="/pravox.net/{{ post.url }}">{{ post.title }}</a></h2>
              {{ post.date | date: "%d %B %Y" }}
              {{ post.excerpt }}
            </li>
          {% endfor %}
        </ul>
      </div>
    </div>
  </div>
</section>
</div></div></div>
<br class="clear">
</div>
