import { useEffect, useState } from "react";

import { Navbar } from "./components";

import "./App.css";

import axios from 'axios'
const App = () => {

  const baseURL = "https://sendright.lrhackathon.com"

  const [templateText, setTemplateText] = useState({ senderName: "ABC Company", recipientName: "recipient", industry: "", templateType: "", language: "", brandLogoURL: "https://apidocs.lrcontent.com/images/loginradius-logo--horizontal-full-colour-on-white_196175e99f5cec6b654.20520541.png", sentiment: "Official", prompt: "", content: "" })
  const [selectedTemplate, setSelectedTemplate] = useState("template1")
  useEffect(() => {

    axios.get(`${baseURL}/api/v1/metadata`).then((response: any) => {

      console.log(response)
      setTemplateTypeOptions(response.data.email_types)
      setLanguageOptions(response.data.languages)
      setIndustryOptions(response.data.industries)
      // setMetadataLoading(!response.data.success)
      setTemplateText((t) => ({ ...t, industry: response.data.industries[0], templateType: response.data.email_types[0], language: response.data.languages.find((language) => { return language === "English" }) }))
    }).catch((err) => { console.log(err) })


  }, [])

  const fetchEmailContent = () => {
    setContentLoading(true)
    setTemplateText({ ...templateText, content: "" })
    axios.post(`${baseURL}/api/v1/template/build`, {

      template_type: templateText.templateType,
      industry_context: templateText.industry,
      language: templateText.language,
      sentiment: templateText.sentiment,
      prompt: templateText.prompt,
      sender_name: templateText.senderName,
      receiver_name: templateText.recipientName

    }).then((response: any) => {
      console.log(response.data.content_text)
      if (response.data.content_text) {
        setContentLoading(false)
      }
      // console.log(response.data.content_text.includes('\n'))
      // let result=response.data.content_text.replaceAll('\n', '"<br/>"')

      setTemplateText({ ...templateText, content: response.data.content_text })

    })
  }



  const [industryOptions, setIndustryOptions] = useState([""])
  const [templateTypeOptions, setTemplateTypeOptions] = useState([""])
  const [languageOptions, setLanguageOptions] = useState([""])

  // const [metadataLoading, setMetadataLoading] = useState(true)
  const [contentLoading, setContentLoading] = useState(false)
  const downloadTxtFile = () => {
    // console.log(templateText.content)
    const element = document.createElement("a");
    const downloadID = selectedTemplate==='template1'?'downloadable_template1':'downloadable_template2'
    const file = new Blob([document.getElementById(downloadID).innerHTML], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "email_template.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
  return (
    // <div className={`${currentMode === "Dark" ? "dark" : "light"}`}>
    //   <BrowserRouter>
    //     <div className="container">
    //       <div className="theme-tooltip-main " style={{ zIndex: "1000" }}>
    //         <div >
    //           <Button
    //             type="button"
    //             className="theme-tooltip-main-button"
    //             style={{ backgroundColor: currentColor, borderRadius: "50%" }}
    //             onClick={() => {
    //               setThemeSettings(true);
    //             }}
    //           >
    //             <FiSettings />
    //           </Button>
    //         </div>
    //       </div>
    //       <Sidebar />
    //       <div
    //         className={`active ${activeMenu ? " activemenu" : "notactivemenu"
    //           }`}
    //       >
    //         <div className="navbar-main">
    //           <Navbar />
    //         </div>

    //         <div>
    //           <ThemeSettings />
    //           <Routes>
    //             <Route path="/generate" element={<Generate />} />
    //             <Route path="/branding" element={<Branding />} />
    //             <Route path="/settings" element={<Settings />} />
    //           </Routes>
    //         </div>
    //       </div>
    //     </div>
    //   </BrowserRouter>
    // </div>

    <div className="flex flex-col h-screen ">

      <Navbar downloadFunc={downloadTxtFile} />
      <div className="main-container flex w-full md:h-screen h-auto flex-col md:flex-row">
        <div className=" flex md:w-3/12 w-full overflow-y-auto md:border-r md:border-solid md:border-gray-300 bg-white md:max-h-[91vh] h-auto p-6">
          <div className="d-flex flex-col w-full">
            <div>
              <h2 className="font-medium text-gray-700 mb-1 text-lg">Transactional Email</h2>
              <p className="text-gray-600 mb-6 text-sm">Email that is triggered by user actions or events.</p>
            </div>
            <div className="form-group flex flex-col gap-1 mb-4">
              <label htmlFor="name" className="text-sm text-gray-700">Sender Name</label>
              <input type="text" id="name" className="py-2 px-4 rounded-md border border-solid border-gray-400 text-sm" name="senderName" placeholder="Sender name" data-form-type="name" value={templateText.senderName}
                onChange={(e) => {
                  setTemplateText({
                    ...templateText,
                    [e.target.name]: e.target.value,
                  });
                }} />
            </div>
            <div className="form-group flex flex-col gap-1 mb-4">
              <label htmlFor="rname" className="text-sm text-gray-700">Recipient Name</label>
              <input type="text" id="rname" className="py-2 px-4 rounded-md border border-solid border-gray-400 text-sm" name="recipientName" placeholder="Recipient name" data-form-type="name" value={templateText.recipientName}
                onChange={(e) => {
                  setTemplateText({
                    ...templateText,
                    [e.target.name]: e.target.value,
                  });
                }} />
            </div>
            <div className="form-group flex flex-col gap-1 mb-4">
              <label htmlFor="" className="text-sm text-gray-700">Industry</label>
              <select className="py-2 pl-[11px] pr-4 rounded-md border border-solid border-gray-400 text-sm" name="industry" placeholder="Industry" data-form-type="other" onChange={(e) => {

                setTemplateText({ ...templateText, [e.target.name]: e.target.value });
              }}
                value={templateText.industry}
                defaultValue={templateText.industry[0]}>

                {industryOptions.map((industry: any) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group flex flex-col gap-1 mb-4">
              <label htmlFor="" className="text-sm text-gray-700">Email Type </label>
              <select className="py-2 pl-[11px] pr-4 rounded-md border border-solid border-gray-400 text-sm" name="templateType" placeholder="Email Type" data-form-type="other" onChange={(e) => {

                setTemplateText({ ...templateText, [e.target.name]: e.target.value });
              }}
                value={templateText.templateType}
                defaultValue={templateText.templateType[0]}
              >
                {templateTypeOptions.map((templateType: any) => (
                  <option key={templateType} value={templateType}>
                    {templateType}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group flex flex-col gap-1 mb-4">
              <label htmlFor="rname" className="text-sm text-gray-700">Additional Information</label>
              <input type="text" id="rname" className="py-2 px-4 rounded-md border border-solid border-gray-400 text-sm" name="prompt" placeholder="Additional Information" data-form-type="name" value={templateText.prompt}
                onChange={(e) => {
                  setTemplateText({
                    ...templateText,
                    [e.target.name]: e.target.value,
                  });
                }} />
            </div>
            <div className="form-group flex flex-col gap-1 mb-4">
              <label htmlFor="rname" className="text-sm text-gray-700">Delivery Tone</label>
              <input type="text" id="rname" className="py-2 px-4 rounded-md border border-solid border-gray-400 text-sm" name="sentiment" placeholder="DeliveryTone" data-form-type="name" value={templateText.sentiment}
                onChange={(e) => {
                  setTemplateText({
                    ...templateText,
                    [e.target.name]: e.target.value,
                  });
                }} />
            </div>
            <div className="form-group flex flex-col gap-1 mb-4">
              <label htmlFor="" className="text-sm text-gray-700">Language </label>
              <select className="py-2 pl-[11px] pr-4 rounded-md border border-solid border-gray-400 text-sm" name="language" placeholder="Language" data-form-type="other" onChange={(e) => {

                setTemplateText({ ...templateText, [e.target.name]: e.target.value });
              }}
                value={languageOptions.find((language) => { return language === templateText.language })}
                defaultValue={languageOptions.find((language) => { return language === "English" })}
              >
                {languageOptions.map((language: any) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group flex flex-col gap-1 mb-4 ">
              <label htmlFor="name" className="text-sm text-gray-700">Brand Logo URL</label>
              <input type="text" id="name" className="py-2 px-4 rounded-md border border-solid border-gray-400 text-sm" name="brandLogoURL" placeholder="Brand Logo URL" data-form-type="name" value={templateText.brandLogoURL}
                onChange={(e) => {
                  setTemplateText({
                    ...templateText,
                    [e.target.name]: e.target.value,
                  });
                }} />
            </div>
            {/* <div className="form-group flex flex-col gap-1 mb-4">
              <label htmlFor="name" className="text-sm text-gray-700">Brand color</label>
              <div className="px-[14px] py-1 rounded-md border border-solid border-gray-400 text-sm">
                <input type="color" className="bg-transparent" name="brandColor" value={templateText.brandColor}
                  onChange={(e) => {
                    setTemplateText({
                      ...templateText,
                      [e.target.name]: e.target.value,

                    });
                  }}
                />
                <span>{templateText.brandColor}</span>
              </div>
            </div> */}
            <div className="d-flex items-end w-full pb-8">
              <button className="bg-blue-700 py-1 px-4 text-white rounded-md h-10 flex items-center gap-2 font-normal transition hover:bg-blue-600 ml-auto" onClick={fetchEmailContent}>Generate</button>
            </div>
          </div>
        </div>
        <div className="md:w-9/12 w-full bg-gray-50">
          <div className="md:mt-0 mt-6 h-14 bg-white px-5 flex justify-between text-base text-gray-700 items-center font-medium border-b border-solid border-gray-300">
            <div>&nbsp;</div>
            <div className="grow">&nbsp;</div>
            <div className="form-group  ">
              <select className="py-2 pl-[11px] pr-4 rounded-md border border-solid border-gray-400 text-sm" placeholder="Network" data-form-type="other" onChange={(e) => {

                setSelectedTemplate(e.target.value)

              }} value={selectedTemplate} defaultValue={"template1"}>

                <option value="template1 ">Template  1</option>
                <option value="template2 ">Template  2</option>
              </select>
            </div>
          </div>
          {selectedTemplate === 'template1' ? <div id='downloadable_template1' className="overflow-y-auto  md:max-h-[83.5vh] h-auto bg-gray-50">
            <div style={{ backgroundColor: "rgb(249 250 251)", padding: 24 }}>
              <center style={{ maxWidth: 600, marginInline: "auto" }}>
                <table
                  border={0}
                  cellSpacing={0}
                  cellPadding={0}
                  style={{
                    borderCollapse: "collapse",
                    backgroundColor: "#ffffff",
                    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.16)",
                    borderRadius: 3,
                    fontFamily: "Arial, Helvetica, sans-serif"
                  }}
                >
                  <tbody>
                    <tr>
                      <td>
                        <div style={{ textAlign: "center", padding: "32px 24px 32px" }}>
                          <img
                            src={templateText.brandLogoURL}
                            style={{ display: "block", marginInline: "auto" }}
                            alt="logo"
                            title="logo"
                            width={200}

                          />
                        </div>
                      </td>
                    </tr>
                    {templateText.content === "" ? contentLoading ? <tr><td><div style={{ width: '600px' }} className="text-center">
                      <div style={{ margin: "20px 0 40px 0" }} role="status">
                        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div></td></tr> : <>
                      <tr>
                        <td>
                          <b
                            style={{
                              color: "#333333",
                              fontSize: 16,
                              fontWeight: 600,
                              padding: "0 24px",
                              margin: "0 0 24px 0",
                              display: "block"
                            }}
                          >
                            {templateText.recipientName ? `Hi ${templateText.recipientName}` : ''}
                          </b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p
                            style={{
                              color: "#4F4F4F",
                              fontSize: 15,
                              padding: "0 24px",
                              lineHeight: "1.5",
                              margin: "0 0 32px 0"
                            }}
                          >
                            Thank you for placing your order with SendRight! We're excited to
                            let you know that your order has been confirmed and is being
                            processed for delivery.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b
                            style={{
                              color: "#333333",
                              fontSize: 16,
                              fontWeight: 600,
                              padding: "0 24px",
                              lineHeight: "1.5",
                              display: "block",
                              margin: "0 0 12px 0"
                            }}
                          >
                            Here are the details of your order:
                          </b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div style={{ padding: "0 24px", marginBottom: 32 }}>
                            <table
                              border={0}
                              cellSpacing={0}
                              cellPadding={0}
                              style={{
                                borderCollapse: "collapse",
                                fontSize: 15,
                                lineHeight: "1.5"
                              }}
                            >
                              <tbody>
                                <tr>
                                  <td>
                                    <b
                                      style={{
                                        color: "#4F4F4F",
                                        fontWeight: 600,
                                        margin: "0 16px 0 0"
                                      }}
                                    >
                                      Order Number:
                                    </b>
                                  </td>
                                  <td>
                                    <p style={{ margin: "0 0 4px 0" }}>12abcd34567890</p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <b
                                      style={{
                                        color: "#4F4F4F",
                                        fontWeight: 600,
                                        margin: "0 16px 0 0"
                                      }}
                                    >
                                      Order Date:
                                    </b>
                                  </td>
                                  <td>
                                    <p style={{ margin: "0 0 4px 0" }}>11/05/2023</p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <b
                                      style={{
                                        color: "#4F4F4F",
                                        fontWeight: 600,
                                        margin: "0 16px 0 0"
                                      }}
                                    >
                                      Delivery Date:
                                    </b>
                                  </td>
                                  <td>
                                    <p style={{ margin: "0 0 4px 0" }}>15/05/2023</p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <b
                                      style={{
                                        color: "#4F4F4F",
                                        fontWeight: 600,
                                        margin: "0 16px 0 0"
                                      }}
                                    >
                                      Delivery Address:
                                    </b>
                                  </td>
                                  <td>
                                    <p style={{ margin: 0 }}>A-102, Ajmer Road, Jaipur</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p
                            style={{
                              color: "#4F4F4F",
                              fontSize: 15,
                              padding: "0 24px",
                              lineHeight: "1.5",
                              margin: "0 0 32px 0"
                            }}
                          >
                            If you have any questions or concerns about your order, please
                            don't hesitate to reach out to our customer service team. You can
                            reply to this email or contact us at{" "}
                            <a href="tel:+91 1234567890" className="text-blue-700">+91 1234567890</a>.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p
                            style={{
                              color: "#4F4F4F",
                              fontSize: 15,
                              padding: "0 24px",
                              lineHeight: "1.5",
                              margin: "0 0 32px 0"
                            }}
                          >
                            Thank you for choosing SendRight for your purchase. We appreciate
                            your business and hope you enjoy your order!
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div style={{ padding: "0 24px 32px" }}>
                            <table
                              border={0}
                              cellSpacing={0}
                              cellPadding={0}
                              style={{ borderCollapse: "collapse", lineHeight: "1.5" }}
                            >
                              <tbody>
                                <tr>
                                  <td>
                                    <b style={{ color: "#333333", fontWeight: 600 }}>
                                      {templateText.senderName ?
                                        "Best Regards," : ""}
                                    </b>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p style={{ fontSize: 15, margin: 0 }}>{templateText.senderName ?
                                      `${templateText.senderName}` : ""}</p>
                                  </td>
                                </tr>

                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </> : <tr><td><p style={{ whiteSpace: "pre-line", padding: "0 24px 32px" }}>{`${templateText.content}`}</p></td></tr>}
                    {/* <tr>
                      <td>
                        <div
                          style={{
                            backgroundColor: "#F5F7FA",
                            padding: "24px 20px",
                            margin: 24
                          }}
                        >
                          <table
                            border={0}
                            cellSpacing={0}
                            cellPadding={0}
                            style={{ borderCollapse: "collapse", lineHeight: "1.5" }}
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <div
                                    style={{
                                      borderBottom: "1px solid #DAE1E9",
                                      padding: "0 0 20px 0",
                                      marginBottom: 96
                                    }}
                                  >
                                    <table
                                      border={0}
                                      cellSpacing={0}
                                      cellPadding={0}
                                      style={{
                                        borderCollapse: "collapse",
                                        lineHeight: "1.5",
                                        width: "100%"
                                      }}
                                    >
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="#">
                                              <img
                                                src={templateText.brandLogoURL}
                                                style={{
                                                  display: "block",
                                                  marginInlineEnd: "auto"
                                                }}
                                                alt="logo"
                                                title="logo"
                                                width={200}
                                              />
                                            </a>
                                          </td>
                                          <td>
                                            <table style={{ marginLeft: "auto" }}>
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    <a href="#">
                                                      <svg
                                                        width={20}
                                                        height={20}
                                                        style={{
                                                          display: "block",
                                                          verticalAlign: "middle"
                                                        }}
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                      >
                                                        <path
                                                          d="M17.3504 1.25H2.74531C1.94727 1.25 1.25 1.82422 1.25 2.61289V17.2504C1.25 18.0434 1.94727 18.75 2.74531 18.75H17.3461C18.1484 18.75 18.75 18.0387 18.75 17.2504V2.61289C18.7547 1.82422 18.1484 1.25 17.3504 1.25ZM6.67461 15.8371H4.16758V8.04219H6.67461V15.8371ZM5.50781 6.85703H5.48984C4.6875 6.85703 4.16797 6.25977 4.16797 5.51211C4.16797 4.75078 4.70117 4.16758 5.52148 4.16758C6.3418 4.16758 6.84375 4.74648 6.86172 5.51211C6.86133 6.25977 6.3418 6.85703 5.50781 6.85703ZM15.8371 15.8371H13.3301V11.575C13.3301 10.5539 12.9652 9.85625 12.0582 9.85625C11.3652 9.85625 10.9551 10.325 10.7727 10.7816C10.7043 10.9457 10.6859 11.1691 10.6859 11.3973V15.8371H8.17891V8.04219H10.6859V9.12695C11.0508 8.60742 11.6207 7.85977 12.9469 7.85977C14.5926 7.85977 15.8375 8.94453 15.8375 11.2832L15.8371 15.8371Z"
                                                          fill="#7E8A98"
                                                        />
                                                      </svg>
                                                    </a>
                                                  </td>
                                                  <td>
                                                    <a
                                                      href="#"
                                                      style={{
                                                        marginInline: 16,
                                                        display: "block"
                                                      }}
                                                    >
                                                      <svg
                                                        width={20}
                                                        height={20}
                                                        style={{
                                                          display: "block",
                                                          verticalAlign: "middle"
                                                        }}
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                      >
                                                        <path
                                                          d="M19.375 4.27735C18.6717 4.58296 17.9275 4.7843 17.166 4.87501C17.9663 4.4064 18.5681 3.66195 18.8586 2.78126C18.102 3.22368 17.2756 3.5341 16.4148 3.69923C16.0524 3.31935 15.6165 3.01716 15.1336 2.811C14.6507 2.60484 14.1309 2.49904 13.6059 2.50001C11.4801 2.50001 9.75977 4.19532 9.75977 6.28516C9.75826 6.57585 9.79157 6.86568 9.85898 7.14844C8.33464 7.07698 6.842 6.68813 5.47656 6.00675C4.11111 5.32537 2.90292 4.36648 1.9293 3.19141C1.58772 3.76724 1.40708 4.42424 1.40625 5.09376C1.40625 6.40626 2.09102 7.56641 3.125 8.2461C2.51239 8.23156 1.91234 8.06942 1.37578 7.77344V7.82032C1.37578 9.65626 2.70391 11.1836 4.46172 11.5313C4.13117 11.6194 3.79053 11.664 3.44844 11.6641C3.20569 11.6645 2.9635 11.6409 2.72539 11.5938C3.21406 13.0977 4.63633 14.1914 6.32109 14.2227C4.9521 15.2777 3.27134 15.848 1.54297 15.8438C1.23618 15.8433 0.929674 15.825 0.625 15.7891C2.38327 16.9118 4.42713 17.5057 6.51328 17.5C13.5977 17.5 17.468 11.7305 17.468 6.72657C17.468 6.56251 17.4637 6.39844 17.4559 6.23829C18.2071 5.70394 18.857 5.03989 19.375 4.27735Z"
                                                          fill="#7E8A98"
                                                        />
                                                      </svg>
                                                    </a>
                                                  </td>
                                                  <td>
                                                    <a href="#">
                                                      <svg
                                                        width={20}
                                                        height={20}
                                                        style={{
                                                          display: "block",
                                                          verticalAlign: "middle"
                                                        }}
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                      >
                                                        <path
                                                          fillRule="evenodd"
                                                          clipRule="evenodd"
                                                          d="M18.75 10.0527C18.75 5.2207 14.832 1.30273 10 1.30273C5.16797 1.30273 1.25 5.2207 1.25 10.0527C1.25 14.4199 4.44922 18.0398 8.63281 18.6969V12.5828H6.41055V10.0527H8.63281V8.125C8.63281 5.93242 9.93945 4.72031 11.9379 4.72031C12.8953 4.72031 13.8969 4.89141 13.8969 4.89141V7.04492H12.793C11.7066 7.04492 11.3668 7.71914 11.3668 8.41211V10.0527H13.7934L13.4059 12.5828H11.3672V18.6977C15.5508 18.041 18.75 14.4211 18.75 10.0527Z"
                                                          fill="#7E8A98"
                                                        />
                                                      </svg>
                                                    </a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <table
                                    border={0}
                                    cellSpacing={0}
                                    cellPadding={0}
                                    style={{
                                      borderCollapse: "collapse",
                                      lineHeight: "1.5"
                                    }}
                                  >
                                    <tbody>
                                      <tr>
                                        <td>
                                          <a href="#" className="text-blue-700">Term of use</a>
                                          &nbsp;&nbsp;|&nbsp;&nbsp;
                                        </td>
                                        <td>
                                          <a href="#" className="text-blue-700">Provacy Policy</a>
                                          &nbsp;&nbsp;|&nbsp;&nbsp;
                                        </td>
                                        <td>
                                          <a href="#" className="text-blue-700">Contact us</a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <p
                                    style={{
                                      color: "#7E8A98",
                                      fontSize: 15,
                                      padding: 0,
                                      lineHeight: "1.5",
                                      margin: "24px 0 0 0"
                                    }}
                                  >
                                    SendRight, 9876 Park Avenue, Suite 5432, Westville, New
                                    York 67890, United States of America
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </center>
            </div>
          </div> : <div id='downloadable_template2' className="overflow-y-auto  md:max-h-[83.5vh] h-auto bg-gray-50">


            <div style={{ backgroundColor: '#F5F7FA', padding: '24px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <center style={{ maxWidth: '600px', marginInline: 'auto' }}>
                <table border={0} cellSpacing="0" cellPadding="0" style={{
                  borderCollapse: 'collapse', backgroundColor: '#ffffff', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.16)', textAlign: 'center',
                  borderRadius: '3px'
                }}>
                  <tr>
                    <td>
                      <div style={{ textAlign: 'center', padding: '32px 24px 32px' }}>
                        <img src={templateText.brandLogoURL} width={200} style={{ display: 'block', marginInline: 'auto' }} alt="logo"
                          title="logo" />
                      </div>
                    </td>
                  </tr>
                  {templateText.content === "" ? contentLoading ? <tr><td><div style={{ width: '600px' }} className="text-center">
                      <div style={{ margin: "20px 0 40px 0" }} role="status">
                        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div></td></tr> : <>
                  <tr>
                    <td>
                      <b
                        style={{ color: '#333333', fontSize: '16px', fontWeight: '600', padding: '0 24px', margin: '0 0 24px 0', display: 'block' }}>
                        {templateText.recipientName ? `Hi ${templateText.recipientName},` : ''}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p
                        style={{ color: '#4F4F4F', fontSize: '15px', padding: '0 24px', lineHeight: '1.5', margin: '0 0 32px 0' }}>
                        Thank you for
                        placing your
                        order with SendRight!
                        We're excited to
                        let you know that your
                        order has been confirmed and is being processed for delivery.</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p
                        style={{ color: '#4F4F4F', fontSize: '15px', padding: '0 24px', lineHeight: '1.5', margin: '0 0 32px 0' }}>
                        If you have any questions or concerns about your order, please don't hesitate to reach
                        out to our customer service team. You can reply to this email or contact us at <a
                          href="tel:+91 1234567890">+91 1234567890</a>.</p>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div style={{ padding: '0 24px 32px' }}>
                        <table border={0} cellSpacing="0" cellPadding="0"
                          style={{ borderCollapse: 'collapse', lineHeight: '1.5', width: '100%' }}>
                          <tr>
                            <td><b style={{ color: '#333333', fontWeight: '600' }}>Best regards,</b></td>
                          </tr>
                          
                          <tr>
                            <td>
                              <p style={{ fontSize: '15px', margin: '0' }}>{templateText.senderName ?
                                      `${templateText.senderName}` : ""}</p>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                  </> : <tr><td><p style={{ whiteSpace: "pre-line", padding: "0 24px 32px" }}>{`${templateText.content}`}</p></td></tr>}
                </table>
              </center>
            </div>
          </div>}


        </div>
      </div>
    </div>
  );
};

export default App;
