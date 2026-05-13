from copy import deepcopy

from docx import Document


DOC_IN = "/Users/user/Desktop/NIR/_work/nir_fixed.docx"
TITLE_OUT = "/Users/user/Desktop/NIR/_work/nir_title.docx"
BODY_OUT = "/Users/user/Desktop/NIR/_work/nir_body.docx"


def _paragraph_text(el):
    # Extract text from a w:p element (best-effort; enough for finding "СОДЕРЖАНИЕ")
    texts = el.xpath(".//w:t")
    return "".join([t.text or "" for t in texts]).strip()


def split_at_contents(doc: Document):
    body = doc.element.body
    children = list(body)

    split_idx = None
    for i, el in enumerate(children):
        if el.tag.endswith("}p"):
            t = _paragraph_text(el)
            if t.upper() == "СОДЕРЖАНИЕ":
                split_idx = i
                break

    if split_idx is None:
        raise RuntimeError('Не нашла "СОДЕРЖАНИЕ" для разделения документа.')

    title_children = children[:split_idx]
    body_children = children[split_idx:]

    return title_children, body_children


def make_doc_with_children(children):
    new_doc = Document()
    new_body = new_doc.element.body

    # Remove the default empty paragraph Word creates
    for el in list(new_body):
        new_body.remove(el)

    for el in children:
        new_body.append(deepcopy(el))

    return new_doc


def main():
    doc = Document(DOC_IN)
    title_children, body_children = split_at_contents(doc)

    title_doc = make_doc_with_children(title_children)
    body_doc = make_doc_with_children(body_children)

    title_doc.save(TITLE_OUT)
    body_doc.save(BODY_OUT)


if __name__ == "__main__":
    main()

