import { useEffect } from "react";
import { useQuill } from "react-quilljs"; // Import from 'react-quilljs'
import "quill/dist/quill.snow.css";

const EditorPage = () => {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get("YOUR_BACKEND_API_ENDPOINT");
        // const initialContent = response.data;
        const initialContent =
          "<!DOCTYPE html>\n<html>\n\n<head>\n  <title>DNA Transcription and Translation</title>\n</head>\n\n<body>\n  <h1>DNA Transcription and Translation</h1>\n  <p>Professor Dave discusses the process of DNA transcription and translation, explaining how the genetic code is read to produce proteins in an organism.</p>\n\n  <h2>Understanding Genetic Coding</h2>\n  <p>Genes within the chromosome code for specific proteins, and the process of transcription and translation is crucial to understanding how a single cell's genetic material results in the development of different organisms.</p>\n\n  <h2>Transcription</h2>\n  <p>Transcription is the process by which RNA polymerase uses one strand of DNA within a gene as a template to produce messenger RNA (mRNA).</p>\n\n  <h3>Initiation and Elongation</h3>\n  <p>RNA polymerase binds to the promoter sequence within the gene and initiates mRNA synthesis at the start codon, then moves downstream along the gene, synthesizing mRNA as it goes.</p>\n\n  <h3>Termination</h3>\n  <p>Once RNA polymerase reaches the end of the gene, termination occurs, and the enzyme detaches from the gene, returning the DNA to its original state.</p>\n\n  <h2>Translation</h2>\n  <p>Translation occurs in the cytoplasm, where the mRNA acts as a code for a specific protein by using codons to specify amino acids.</p>\n\n  <h3>Initiation and Elongation</h3>\n  <p>The ribosome binds to the mRNA and initiator tRNA, and the process of linking amino acids together continues until a stop codon is reached.</p>\n\n  <h3>Termination</h3>\n  <p>Once the stop codon is reached, the completed polypeptide is released, likely entering cell organelles for further modification.</p>\n</body>\n\n</html>"; // Your HTML content

        // Set the initial content in Quill when it's available
        if (quill) {
          quill.clipboard.dangerouslyPasteHTML(initialContent);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchData();
  }, [quill]);

  const handleSave = async () => {
    try {
      const newContent = quill.root.innerHTML;
      // Use axios or your preferred method to save the new content to the backend
      // await axios.post("YOUR_BACKEND_API_ENDPOINT", { content: newContent });
      console.log("Content saved successfully: " + newContent);
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  return (
    <div>
      <div ref={quillRef} className="w-50"></div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditorPage;
