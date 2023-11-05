import streamlit as st

from langchain.agents import initialize_agent, AgentType
from langchain.callbacks import StreamlitCallbackHandler
from langchain.chat_models import ChatCohere
from langchain.tools import DuckDuckGoSearchRun
from langchain.tools import HumanInputRun

#PDF File upload and read
file = st.file_uploader("Upload only PDF files ", type="pdf")
import PyPDF2
content = ""
if file is not None:
    # Read the PDF file
    pdf_reader = PyPDF2.PdfReader(file)
    # Extract the content
    for page in range(len(pdf_reader.pages)):
        content += pdf_reader.pages[page].extract_text()
    # Display the content
    st.write(content)

with st.sidebar:
    cohere_api_key = st.text_input("Cohere API Key", key="langchain_search_api_key_cohere", type="password")
    "[Get an OpenAI API key](https://platform.openai.com/account/api-keys)"
    "[View the source code](https://github.com/streamlit/llm-examples/blob/main/pages/2_Chat_with_search.py)"
    "[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/streamlit/llm-examples?quickstart=1)"
st.title("Study Guide Assistant")


if "messages" not in st.session_state:
    st.session_state["messages"] = [
        {"role": "assistant", "content": "Hi, I'm a chatbot who process the pdf documents you upload and answer questions about them. How can I help you?"}
    ]

for msg in st.session_state.messages:
    st.chat_message(msg["role"]).write(msg["content"])

if prompt := st.chat_input(placeholder="Hey, what is the powerhouse of the cell?"):
    st.session_state.messages.append({"role": "user", "content": prompt})
    st.chat_message("user").write(prompt)


    if not cohere_api_key:
        st.info("Please add your CohereAI API key to continue.")
        st.stop()

    llm = ChatCohere(model_name="gpt-3.5-turbo", cohere_api_key=cohere_api_key, streaming=True)
    #search = DuckDuckGoSearchRun(name="Search")
    search= HumanInputRun(description=f'base your replies off of the following text: {content}')
    search_agent = initialize_agent([search], llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, handle_parsing_errors=True)
    with st.chat_message("assistant"):
        st_cb = StreamlitCallbackHandler(st.container(), expand_new_thoughts=False,collapse_completed_thoughts=True)
        response = search_agent.run(st.session_state.messages, callbacks=[st_cb])
        st.session_state.messages.append({"role": "assistant", "content": response})
        st.write(response)