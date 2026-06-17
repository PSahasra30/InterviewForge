from langchain_community.document_loaders import PyPDFLoader

def extract_pdf_text(pdf_path):

    loader = PyPDFLoader(pdf_path)

    documents = loader.load()

    return documents