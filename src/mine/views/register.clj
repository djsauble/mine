(ns mine.views.register
  (:require [mine.views.common :as common])
  (:use [noir.core :only [defpage]]
        [hiccup.core :only [html]]))

(defpage "/" []
  (common/site-layout
    [:h1 "Register a File"]
    [:div.file
      [:div#drag-n-drop
        [:h2 "Drag a file here"]]
      [:form {:action "/register" :method "post" :class "browse"}
        [:input {:id "name" :name "name" :placeholder "Drag and drop a file" :readonly "true"}]
        [:input {:id "hash" :name "hash" :type "hidden"}]
        [:button {:disabled "disabled"} "Register"]]]))

(defpage [:post "/register"] [:as file]
  (common/site-layout
    [:h1 "You Just Registered a File"]
    [:div.file (print-str (val (find file :name)) "has a fingerprint of" (val (find file :hash)))]))
