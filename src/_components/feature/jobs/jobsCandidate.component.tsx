import React from 'react';
import { Icon } from 'antd';

interface IProps {
    history: any,
    location: any,
    match: any
}

export const JobsCandidate: React.FC<IProps> = ({ history, location, match }) => {
    return (
        <div className="col-12">
            <div className="containerBody col-12">
                <div className="candidateCont col-12">
                    <div className="row">
                        <div className="candidateHead col-12">
                            <div className="row">
                                <div className="col-2 candidateHeadImg">
                                    <div className="candidateHeadImgCont">
                                        <img className="img-fluid rounded-circle" src="/tatenda.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="col-8 candidateHeadName">
                                    <p>Tatenda Makunike, <span className="city">Johannesburg</span></p>
                                </div>

                                <div className="col-2 candidateHeadImg">
                                    <div className="candidateHeadMatch">
                                        <p>60%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="candidateDesc col-12">
                            <p>
                                Description is the fiction-writing mode for transmitting a mental
                                image of the particulars of a story. Together with dialogue,
                                narration, exposition, and summarization, description is one of
                                the most widely recognized of the fiction-writing modes. As stated
                                in Writing from A to Z, edited by Kirk Polking, description is more
                                than the amassing of details; it is bringing something to life by
                                carefully choosing and arranging words and phrases to produce the
                                desired effect.[6] The most appropriate and effective techniques for
                                presenting description are a matter of ongoing discussion among writers
                                and writing coaches.
                            </p>
                        </div>

                        <div className="col-4 candidateSection">
                            <div className="col-12 candidateSectionBody">
                                <div className="row">
                                    <div className="candidateSectionBodyHead col-12">
                                        <p>EDUCATION</p>
                                    </div>
                                    <div className="candidateSectionBodyDesc col-12">
                                        <ul className="row">
                                            <li className="col-12">
                                                <div className="row">
                                                    <div className="col-2 candidateSectionBodyDescImg">
                                                        <Icon type="read" />
                                                    </div>
                                                    <div className="col-10 candidateSectionBodyDescTxt">
                                                        <p>BSC Statistics and Economics, University of The Free State</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="col-12">
                                                <div className="row">
                                                    <div className="col-2 candidateSectionBodyDescImg">
                                                        <Icon type="read" />
                                                    </div>
                                                    <div className="col-10 candidateSectionBodyDescTxt">
                                                        <p>BSC Statistics and Economics, University of The Free State</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-4 candidateSection">
                            <div className="col-12 candidateSectionBody">
                                <div className="row">
                                    <div className="candidateSectionBodyHead col-12">
                                        <p>SKILLS</p>
                                    </div>
                                    <div className="candidateSectionBodyDesc col-12">
                                        <ul className="row">
                                            <li className="col-12">
                                                <div className="row">
                                                    <div className="col-2 candidateSectionBodyDescImg">
                                                        <Icon type="tool" />
                                                    </div>
                                                    <div className="col-10 candidateSectionBodyDescTxt">
                                                        <p>Database Adminstration</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="col-12">
                                                <div className="row">
                                                    <div className="col-2 candidateSectionBodyDescImg">
                                                        <Icon type="tool" />
                                                    </div>
                                                    <div className="col-10 candidateSectionBodyDescTxt">
                                                        <p>Fullstake Development</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="col-12">
                                                <div className="row">
                                                    <div className="col-2 candidateSectionBodyDescImg">
                                                        <Icon type="tool" />
                                                    </div>
                                                    <div className="col-10 candidateSectionBodyDescTxt">
                                                        <p>Search Engine Optimization</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="col-12">
                                                <div className="row">
                                                    <div className="col-2 candidateSectionBodyDescImg">
                                                        <Icon type="tool" />
                                                    </div>
                                                    <div className="col-10 candidateSectionBodyDescTxt">
                                                        <p>UI/UX Design</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 candidateSection">
                            <div className="col-12 candidateSectionBody">
                                <div className="row">
                                    <div className="candidateSectionBodyHead col-12">
                                        <p>Experience</p>
                                    </div>
                                    <div className="candidateSectionBodyDesc col-12">
                                        <ul className="row">
                                            <li className="col-12">
                                                <div className="row">
                                                    <div className="col-2 candidateSectionBodyDescImg">
                                                        <Icon type="bank" />
                                                    </div>
                                                    <div className="col-10 candidateSectionBodyDescTxt">
                                                        <p>Silicon Maboneng</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="col-12">
                                                <div className="row">
                                                    <div className="col-2 candidateSectionBodyDescImg">
                                                        <Icon type="bank" />
                                                    </div>
                                                    <div className="col-10 candidateSectionBodyDescTxt">
                                                        <p>Student Assistant UFS</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="col-12">
                                                <div className="row">
                                                    <div className="col-2 candidateSectionBodyDescImg">
                                                        <Icon type="bank" />
                                                    </div>
                                                    <div className="col-10 candidateSectionBodyDescTxt">
                                                        <p>Genesis Africa Investments</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="col-12">
                                                <div className="row">
                                                    <div className="col-2 candidateSectionBodyDescImg">
                                                        <Icon type="bank" />
                                                    </div>
                                                    <div className="col-10 candidateSectionBodyDescTxt">
                                                        <p>Mmogo Media</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}