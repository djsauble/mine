(ns mine.views.common
  (:use [noir.core :only [defpartial]]
        [hiccup.page-helpers :only [include-css include-js html5]]))

(defpartial layout [& content]
            (html5
              [:head
               [:title "mine"]
               (include-css "/css/reset.css")]
              [:body
               [:div#wrapper
                content]]))

(defpartial site-layout [& content]
  (html5
    [:head
      [:title "Mine Files"]
      (include-css "/css/application.css")
      (include-js "/js/jquery-1.7.2.js")
      (include-js "/js/application.js")]
    [:body
      [:div#wrapper
        content]]))
