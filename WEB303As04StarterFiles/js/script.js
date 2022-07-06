/*
 {Chinar Bawa}
*/
$(function () {
    $(".accordion").on("click", ".accordion-control", function (e) {
        e.preventDefault();
        $(this).next(".accordion-panel").not(":animated").slideToggle();
      });
    $(".tab-list").each(function () {
      // Find lists of tabs
      var $this = $(this); // Store this list
      var $activeTab = $this.find("li.active"); // Get the active li
      var $activeTabLink = $activeTab.find("a"); // Get its link
      var $activePanelId = $activeTabLink.attr("href"); // Get the id value of the panel
      var $activePanel = $($activePanelId); // Get active panel
      // var $activePanel = $('#tab1'); // select Michael's panel
      $this.on("click", ".tab-control", function (e) {
        // Click tab
        e.preventDefault(); // Prevent link
        var $clickedTabLink = $(this); // Store current link
        var clickedPanelId = this.hash; // Get clicked tab
        if (clickedPanelId && !$clickedTabLink.parent().is(".active")) {
          // If not active
          $activePanel.removeClass("active"); // Make panel and
          $activeTab.removeClass("active"); // tab inactive
          $activePanel = $(clickedPanelId).addClass("active"); // Make new panel and
          // this is the equivalent, but on two lines instead of using method chaining
          // $activePanel = $(clickedPanelId);
          // $activePanel.addClass("active"); // Make new panel and
  
          $activeTab = $clickedTabLink.parent().addClass("active"); // tab active
        }
      });
    });
  });