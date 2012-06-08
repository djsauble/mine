(ns mine.views.welcome
  (:require [mine.views.common :as common])
  (:use [noir.core :only [defpage]]
        [hiccup.core :only [html]]))

(defpage "/" []
  (common/site-layout
    [:h1 "Register PDF"]
    [:div.file
      [:div#drag-n-drop
        [:h2 "Drag files here"]]
      [:form.browse
        [:input {:placeholder "Drag and drop a PDF" :readonly "true"}]
        [:button {:disabled "disabled"} "Register"]]]))
