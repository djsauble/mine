(ns mine.views.welcome
  (:require [mine.views.common :as common])
  (:use [noir.core :only [defpage]]
        [hiccup.core :only [html]]))

(defpage "/" []
  (common/site-layout
    [:h1 "Register File"]
    [:form
      [:input {:placeholder "Browse for a file" :readonly "true"}]
      [:button "Browse"]
    ]
    ))
