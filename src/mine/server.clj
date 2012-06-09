(ns mine.server
  (:require [noir.server :as server]
            [clojure.java.jdbc :as sql]))

(server/load-views "src/mine/views/")

(defn -main [& m]
  (let [mode (keyword (or (first m) :dev))
        port (Integer. (get (System/getenv) "PORT" "8080"))]
    (server/start port {:mode mode
                        :ns 'mine})))

(def db {:classname "com.mysql.jdbc.Driver"
         :subprotocol "mysql"
         :subname "//localhost:3306/mine"
         :user "root"
         :password nil})

(defn list-hashes []
  (sql/with-connection db
    (sql/with-query-results rows
      ["select * from hashes"]
      (println rows))))
