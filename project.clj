(defproject com.github.djsauble2.mine "0.1.0-SNAPSHOT"
            :description "Mine is a file registry, designed to provide proof about which files are yours."
            :dependencies [[org.clojure/clojure "1.3.0"]
                           [org.clojure/java.jdbc "0.0.6"]
                           [mysql/mysql-connector-java "5.1.6"]
                           [noir "1.2.1"]]
            :main mine.server)
