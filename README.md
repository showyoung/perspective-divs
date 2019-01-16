# perspective-divs
3d perspective divs with jquery
1.add id or class name to the div or other DOM.
expmple:
<div id="whatever">
</div>

2.add some child nodes.
expmple:
<div id="whatever">
  <div class=""bg><img src="img/pictures/background_01.jpg" /></div>
  <nav>
    <ul>
      <li>title</li>
      <li>menu1</li>
      <li>menu2</li>
      <li>menu3</li>
    </ul>
  </nav>
  <main>
    <section>1</section>
    <section>2</section>
    <section>3</section>
  </main>
  <foot>something</foot>
</div>

3.add jquery and this plugin to script.
<script src="js/jquery/jquery-3.3.1.min.js"></script>
<script src="js/perspective.js"></script>
<script>
  $(function(){
    $("#whatever").perspective();
  });
</script>

More:
