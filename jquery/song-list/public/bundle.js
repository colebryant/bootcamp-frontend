(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

$(document).ready(function () {
  // Use jQuery to get a reference to `load-songs`
  let button = $("#load-songs"); // Use jQuery to get a reference to `song-list`

  let article = $("#song-list");
  /*
      Attach a click handler to the button with jQuery. When
      the button is clicked, use $.ajax() to load `songs.json`
      from the file system
  */

  button.click(() => {
    $.ajax({
      url: "http://localhost:8088/songs",
      success: result => {
        console.log(result);
      }
    }).then(parsedResponse => {
      parsedResponse.forEach(song => {
        console.log(song.title);
        const songContainer = $("<section>").addClass("song");
        console.log(songContainer);
        const header = $("<h1>").addClass("song__title").text(song.title);
        const description = $("<section>").addClass("song__description").text(`Performed by ${song.artist} on the album ${song.album}`);
        songContainer.append(header);
        songContainer.append(description);
        article.append(songContainer);
      });
    });
  });
  /*
      Chain a `.then()` method to the ajax call, and when
      it is complete build a DOM component for each song with
      the following structure. Use the jQuery append() method
      to put an HTML representation of each song the DOM as a
      child component of the .
            <section class="song">
              <h1 class="song__title">{Title of song}</h1>
              <section class="song__description">
                  Performed by {artist} on the album {album}
              </section>
          </section>
  */
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLENBQUMsQ0FBQyxRQUFELENBQUQsQ0FBWSxLQUFaLENBQWtCLFlBQVc7QUFFekI7QUFDQSxNQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsYUFBRCxDQUFkLENBSHlCLENBSXpCOztBQUNBLE1BQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxZQUFELENBQWY7QUFDQTs7Ozs7O0FBTUEsRUFBQSxNQUFNLENBQUMsS0FBUCxDQUFjLE1BQU07QUFDaEIsSUFBQSxDQUFDLENBQUMsSUFBRixDQUFPO0FBQUMsTUFBQSxHQUFHLEVBQUUsNkJBQU47QUFBcUMsTUFBQSxPQUFPLEVBQUcsTUFBRCxJQUFZO0FBQzdELFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0g7QUFGTSxLQUFQLEVBR0MsSUFIRCxDQUdNLGNBQWMsSUFBSTtBQUNwQixNQUFBLGNBQWMsQ0FBQyxPQUFmLENBQXVCLElBQUksSUFBSTtBQUMzQixRQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBSSxDQUFDLEtBQWpCO0FBQ0EsY0FBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDLFdBQUQsQ0FBRCxDQUFlLFFBQWYsQ0FBd0IsTUFBeEIsQ0FBdEI7QUFDQSxRQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksYUFBWjtBQUNBLGNBQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVSxRQUFWLENBQW1CLGFBQW5CLEVBQWtDLElBQWxDLENBQXVDLElBQUksQ0FBQyxLQUE1QyxDQUFmO0FBRUEsY0FBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDLFdBQUQsQ0FBRCxDQUFlLFFBQWYsQ0FBd0IsbUJBQXhCLEVBQTZDLElBQTdDLENBQW1ELGdCQUFlLElBQUksQ0FBQyxNQUFPLGlCQUFnQixJQUFJLENBQUMsS0FBTSxFQUF6RyxDQUFwQjtBQUVBLFFBQUEsYUFBYSxDQUFDLE1BQWQsQ0FBcUIsTUFBckI7QUFDQSxRQUFBLGFBQWEsQ0FBQyxNQUFkLENBQXFCLFdBQXJCO0FBQ0EsUUFBQSxPQUFPLENBQUMsTUFBUixDQUFlLGFBQWY7QUFDSCxPQVhEO0FBWUgsS0FoQkQ7QUFpQkgsR0FsQkQ7QUFvQkE7Ozs7Ozs7Ozs7Ozs7QUFjSCxDQTlDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8vIFVzZSBqUXVlcnkgdG8gZ2V0IGEgcmVmZXJlbmNlIHRvIGBsb2FkLXNvbmdzYFxyXG4gICAgbGV0IGJ1dHRvbiA9ICQoXCIjbG9hZC1zb25nc1wiKTtcclxuICAgIC8vIFVzZSBqUXVlcnkgdG8gZ2V0IGEgcmVmZXJlbmNlIHRvIGBzb25nLWxpc3RgXHJcbiAgICBsZXQgYXJ0aWNsZSA9ICQoXCIjc29uZy1saXN0XCIpO1xyXG4gICAgLypcclxuICAgICAgICBBdHRhY2ggYSBjbGljayBoYW5kbGVyIHRvIHRoZSBidXR0b24gd2l0aCBqUXVlcnkuIFdoZW5cclxuICAgICAgICB0aGUgYnV0dG9uIGlzIGNsaWNrZWQsIHVzZSAkLmFqYXgoKSB0byBsb2FkIGBzb25ncy5qc29uYFxyXG4gICAgICAgIGZyb20gdGhlIGZpbGUgc3lzdGVtXHJcbiAgICAqL1xyXG5cclxuICAgIGJ1dHRvbi5jbGljayggKCkgPT4ge1xyXG4gICAgICAgICQuYWpheCh7dXJsOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9zb25nc1wiLCBzdWNjZXNzOiAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgfX0pXHJcbiAgICAgICAgLnRoZW4ocGFyc2VkUmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICBwYXJzZWRSZXNwb25zZS5mb3JFYWNoKHNvbmcgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc29uZy50aXRsZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzb25nQ29udGFpbmVyID0gJChcIjxzZWN0aW9uPlwiKS5hZGRDbGFzcyhcInNvbmdcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzb25nQ29udGFpbmVyKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9ICQoXCI8aDE+XCIpLmFkZENsYXNzKFwic29uZ19fdGl0bGVcIikudGV4dChzb25nLnRpdGxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9ICQoXCI8c2VjdGlvbj5cIikuYWRkQ2xhc3MoXCJzb25nX19kZXNjcmlwdGlvblwiKS50ZXh0KGBQZXJmb3JtZWQgYnkgJHtzb25nLmFydGlzdH0gb24gdGhlIGFsYnVtICR7c29uZy5hbGJ1bX1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzb25nQ29udGFpbmVyLmFwcGVuZChoZWFkZXIpO1xyXG4gICAgICAgICAgICAgICAgc29uZ0NvbnRhaW5lci5hcHBlbmQoZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgYXJ0aWNsZS5hcHBlbmQoc29uZ0NvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICAgICBDaGFpbiBhIGAudGhlbigpYCBtZXRob2QgdG8gdGhlIGFqYXggY2FsbCwgYW5kIHdoZW5cclxuICAgICAgICBpdCBpcyBjb21wbGV0ZSBidWlsZCBhIERPTSBjb21wb25lbnQgZm9yIGVhY2ggc29uZyB3aXRoXHJcbiAgICAgICAgdGhlIGZvbGxvd2luZyBzdHJ1Y3R1cmUuIFVzZSB0aGUgalF1ZXJ5IGFwcGVuZCgpIG1ldGhvZFxyXG4gICAgICAgIHRvIHB1dCBhbiBIVE1MIHJlcHJlc2VudGF0aW9uIG9mIGVhY2ggc29uZyB0aGUgRE9NIGFzIGFcclxuICAgICAgICBjaGlsZCBjb21wb25lbnQgb2YgdGhlIC5cclxuXHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwic29uZ1wiPlxyXG4gICAgICAgICAgICAgICAgPGgxIGNsYXNzPVwic29uZ19fdGl0bGVcIj57VGl0bGUgb2Ygc29uZ308L2gxPlxyXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJzb25nX19kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIFBlcmZvcm1lZCBieSB7YXJ0aXN0fSBvbiB0aGUgYWxidW0ge2FsYnVtfVxyXG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAqL1xyXG59KTsiXX0=
