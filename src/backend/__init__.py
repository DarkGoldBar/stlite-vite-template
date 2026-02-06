import streamlit as st

async def main():
    st.set_page_config(page_title="Stlite-Vite Template", layout="centered")

    if "count" not in st.session_state:
        st.session_state.count = 0

    with st.container(horizontal_alignment="center"):
        with st.container(horizontal=True, horizontal_alignment="center"):
            st.image('src/assets/vite.svg', width=100)
            st.image('src/assets/streamlit.png', width=200)

        st.header('Vite + Stlite', width='content')

        if st.button(f"count is {st.session_state.count}"):
            st.session_state.count += 1
            st.rerun()
