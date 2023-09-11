from dotenv import load_dotenv
from pathlib import Path 
import os
from neo4j import GraphDatabase, RoutingControl
import pandas

load_dotenv(dotenv_path=Path('../.env'))

NEO4J_URI = os.getenv('NEO4J_URI')
NEO4J_USERNAME = os.getenv('NEO4J_USERNAME')
NEO4J_PASSWORD = os.getenv('NEO4J_PASSWORD')
NEO4J_DB = os.getenv('NEO4J_DB')

NEO4J_AUTH = (NEO4J_USERNAME, NEO4J_PASSWORD)

RELS_DATA = "relationships.csv"
NODES_DATA = "nodes.csv"

class Setup:
    def __init__(self) -> None:
        self.driver = GraphDatabase.driver(NEO4J_URI, auth=NEO4J_AUTH)

    def initDatabase(self):
        # create_query = f'CREATE DATABASE {NEO4J_DB} IF NOT EXISTS'
        # results = self.driver.execute_query(create_query, database_=NEO4J_DB)
        queries = ['CREATE CONSTRAINT IF NOT EXISTS FOR (a:Address) REQUIRE a.address IS UNIQUE', 
                 'CREATE CONSTRAINT IF NOT EXISTS FOR (t:Transaction) REQUIRE t.hash IS UNIQUE']
        for query in queries:
            results = self.driver.execute_query(query, database_=NEO4J_DB)
            print(results)

    def createRelationships(self):
        df = pandas.read_csv(RELS_DATA)
        for _, row in df.iterrows():
            fields = []
            from_address  = row.pop('from_address')
            to_address = row.pop('to_address')
            for k,v in row.items():
                if(isinstance(v, str)):
                    # if(not v.isnumeric()):
                    v = f'"{v}"'
                fields.append(f"{k}: {v}")
            fields_str = ", ".join(fields)
            query = f'MATCH (to:Address), (from:Address) WHERE to.address = "{to_address}" AND from.address = "{from_address}" CREATE (t:Transaction{{{ fields_str }}}), (from)-[:BUY]->(t), (to)-[:SELL]->(t)'
            try:
                results = self.driver.execute_query(query, database_=NEO4J_DB)
                print(results)
            except Exception as e:
                print(e)

    def createNodes(self):
        df = pandas.read_csv(NODES_DATA)
        query = []
        for _, row in df.iterrows():
            query.append(f'MERGE (:Address{{address: "{row.get("addressId")}", type:"{row.get("type")}"}})')
        query = list(dict.fromkeys(query))
        results = self.driver.execute_query( '\n'.join(query), database_=NEO4J_DB)
        print(results)

    def run(self):
        self.initDatabase()
        self.createNodes()
        self.createRelationships()

setup = Setup()
setup.run()



