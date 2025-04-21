import React, { useState } from "react";
import { AnalysisCard } from "./AnalysisCard";
import { MetricDisplay } from "./MetricDisplay";
import { SecurityRiskItem } from "./SecurityRiskItem";
import { PerformanceMetric } from "./PerformanceMetric";
import { CodeMetricRow } from "./CodeMetricRow";
import { InsightMetricRow } from "./InsightMetricRow";

const CodeAnalyseCompleted: React.FC = () => {
  const [activeTab, setActiveTab] = useState("assessment");

  return (
    <div className="bg-[rgba(244,251,251,1)] overflow-hidden">
      <div className="w-full max-md:max-w-full">
        {/* Header */}
        <header className="bg-[rgba(36,229,169,1)] flex min-h-[54px] w-full flex-col items-stretch justify-center px-[46px] py-[11px] max-md:max-w-full max-md:px-5">
          <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap max-md:max-w-full">
            <div className="self-stretch gap-2.5 text-base text-black font-bold whitespace-nowrap tracking-[-0.1px] my-auto">
              Legacyleap
            </div>
            <div className="self-stretch flex items-center gap-6 my-auto">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/8d2402053e86b179ffbc49c5a73401133a29ef51?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-8 self-stretch shrink-0 my-auto rounded-[0px_0px_0px_0px]"
                alt="Notification"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/7575e010272ad0585291f682960e09e9662997a1?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-8 self-stretch shrink-0 my-auto rounded-[999px]"
                alt="User profile"
              />
            </div>
          </div>
        </header>

        {/* Project Header */}
        <div className="bg-white min-h-[130px] w-full pt-[30px] pb-3 px-[46px] max-md:max-w-full max-md:px-5">
          <div className="w-full max-md:max-w-full">
            <div className="flex w-full items-center justify-between flex-wrap max-md:max-w-full">
              <div className="self-stretch flex min-w-60 items-center gap-[5px] text-[28px] text-[rgba(0,65,45,1)] font-semibold tracking-[-0.17px] flex-wrap flex-1 shrink basis-[0%] my-auto max-md:max-w-full">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/1cc648b6a904cecf5aa50af5aed40b069cdaf174?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
                  alt="Project icon"
                />
                <div className="self-stretch my-auto">Flipkart Ecommerce</div>
              </div>
              <div className="self-stretch gap-1 text-sm text-[rgba(0,43,30,1)] font-medium tracking-[-0.08px] my-auto">
                <span style={{ fontWeight: 400 }}>Code Analysed on:</span> 12
                Jan 2025
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex w-full items-center whitespace-nowrap justify-between flex-wrap mt-[18px] max-md:max-w-full">
              <div className="self-stretch flex min-w-60 items-center gap-1 text-sm text-[rgba(0,32,22,1)] font-semibold tracking-[-0.08px] leading-none flex-wrap flex-1 shrink basis-[0%] my-auto max-md:max-w-full">
                <button
                  className={`${activeTab === "assessment" ? "bg-[rgba(21,174,136,1)] text-white shadow-[0px_1px_2px_rgba(82,88,102,0.06)]" : ""} self-stretch flex min-h-9 items-center gap-1 my-auto px-3 py-2 rounded-lg`}
                  onClick={() => setActiveTab("assessment")}
                >
                  <div className="self-stretch gap-1.5 my-auto">Assessment</div>
                </button>
                <button
                  className={`${activeTab === "comprehend" ? "bg-[rgba(21,174,136,1)] text-white shadow-[0px_1px_2px_rgba(82,88,102,0.06)]" : ""} self-stretch min-h-7 gap-2.5 w-[106px] my-auto`}
                  onClick={() => setActiveTab("comprehend")}
                >
                  Comprehend
                </button>
                <button
                  className={`${activeTab === "recommend" ? "bg-[rgba(21,174,136,1)] text-white shadow-[0px_1px_2px_rgba(82,88,102,0.06)]" : ""} self-stretch min-h-7 gap-2.5 w-[106px] my-auto`}
                  onClick={() => setActiveTab("recommend")}
                >
                  Recommend
                </button>
              </div>

              {/* Grade Legend */}
              <div className="self-stretch flex min-w-60 items-center gap-5 text-center my-auto">
                <div className="self-stretch flex items-center gap-1.5 my-auto">
                  <div className="self-stretch text-sm text-white font-bold tracking-[0.14px] w-[18px] my-auto rounded-sm">
                    <div className="bg-[rgba(0,196,135,1)] w-[18px] h-[18px] px-0.5 rounded-sm">
                      A
                    </div>
                  </div>
                  <div className="text-[rgba(109,102,102,1)] text-xs font-medium tracking-[0.12px] self-stretch my-auto">
                    Minor
                  </div>
                </div>
                <div className="self-stretch flex items-center gap-1.5 my-auto">
                  <div className="self-stretch text-sm text-white font-bold tracking-[0.14px] w-[18px] my-auto rounded-sm">
                    <div className="bg-[rgba(141,196,0,1)] w-[18px] h-[18px] px-0.5 rounded-sm">
                      B
                    </div>
                  </div>
                  <div className="text-[rgba(109,102,102,1)] text-xs font-medium tracking-[0.12px] self-stretch my-auto">
                    Major
                  </div>
                </div>
                <div className="self-stretch flex items-center gap-1.5 my-auto">
                  <div className="self-stretch text-sm text-white font-bold tracking-[0.14px] w-[18px] my-auto rounded-sm">
                    <div className="bg-[rgba(237,199,65,1)] w-[18px] h-[18px] px-0.5 rounded-sm">
                      C
                    </div>
                  </div>
                  <div className="self-stretch text-xs text-[rgba(109,102,102,1)] font-medium tracking-[0.12px] w-10 my-auto rounded-[0px_0px_0px_0px]">
                    Critical
                  </div>
                </div>
                <div className="self-stretch flex items-center gap-1.5 my-auto">
                  <div className="self-stretch text-sm text-white font-bold tracking-[0.14px] w-[18px] my-auto rounded-sm">
                    <div className="bg-[rgba(253,69,69,1)] w-[18px] h-[18px] px-0.5 rounded-sm">
                      D
                    </div>
                  </div>
                  <div className="text-[rgba(109,102,102,1)] text-xs font-medium tracking-[0.12px] self-stretch my-auto">
                    Blocker
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-full justify-between mt-5 px-[46px] max-md:max-w-full max-md:px-5">
        <div className="flex min-w-60 w-full justify-between flex-1 shrink basis-[0%] max-md:max-w-full">
          <div className="flex min-w-60 w-full gap-5 flex-wrap flex-1 shrink basis-[0%] max-md:max-w-full">
            {/* Left Column */}
            <div className="flex min-w-60 flex-col items-stretch justify-center w-[514px] max-md:max-w-full">
              {/* Code Analysis Card */}
              <AnalysisCard title="Code Analysis">
                <div className="flex w-full items-center gap-2.5 flex-wrap max-md:max-w-full">
                  <MetricDisplay
                    label="Code complexity"
                    value="A"
                    grade="A"
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/6b81078e0b3ada3eadf066715993fc259b6e4d17?placeholderIfAbsent=true"
                    infoText="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/17dd735e8828bcbed7b73bb1f2ff339d306d7ef5?placeholderIfAbsent=true"
                  />
                  <MetricDisplay
                    label="Tech Debt"
                    value="10d 6h"
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/9db82ff1190c010b64265c0c89831e5732a9dfd1?placeholderIfAbsent=true"
                    infoText="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/a670b4cf38c87211677ca52a0c88666408a440e5?placeholderIfAbsent=true"
                  />
                </div>
                <div className="flex w-full items-center gap-2.5 flex-wrap mt-[17px] max-md:max-w-full">
                  <MetricDisplay
                    label="Security risk"
                    value="D"
                    grade="D"
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/145f7ea15bbb9ae8d0f06d16ce0ae4325db52e79?placeholderIfAbsent=true"
                    infoText="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/075643386f4a7c221cf66e7f50ea6af967d8ff56?placeholderIfAbsent=true"
                  />
                  <MetricDisplay
                    label="Architecture Compexity"
                    value="B"
                    grade="B"
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/57f2a3a682adf35210132e2ea23aed0fb7775961?placeholderIfAbsent=true"
                    infoText="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/456c306be0f080827899406639020198e4ccd596?placeholderIfAbsent=true"
                  />
                </div>
                <div className="flex w-full gap-2.5 flex-wrap mt-[17px] max-md:max-w-full">
                  <MetricDisplay
                    label="Cloud Compatibility"
                    value="C"
                    grade="C"
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/434248c148b9ee777467d35b845d515c1e598686?placeholderIfAbsent=true"
                    infoText="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/fa9970bbd33e309d6f1f7aac2c85a5700909911c?placeholderIfAbsent=true"
                  />
                  <div className="bg-[rgba(244,251,251,1)] overflow-hidden text-xs text-[rgba(0,39,38,1)] font-bold uppercase tracking-[0.24px] flex-1 shrink basis-[0%] px-3 py-2.5 rounded-lg">
                    <div className="self-stretch w-full">
                      Cloud <br />
                      Compatibility{" "}
                    </div>
                    <div className="flex min-h-[18px] w-full mt-2.5" />
                  </div>
                </div>
              </AnalysisCard>

              {/* About Card */}
              <AnalysisCard title="About" className="mt-5">
                <div className="text-[#0a0d14] text-base font-medium leading-[22px] tracking-[-0.1px] mt-[15px] max-md:max-w-full">
                  Java (Spring Boot), Angular, PostgreSQL, Redis, Docker,
                  Kubernetes
                </div>
                <div className="text-[rgba(123,132,129,1)] text-xs font-normal leading-[18px] mt-[15px] max-md:max-w-full">
                  A legacy e-commerce platform providing product listings, order
                  management, and payment processing, currently being modernized
                  for cloud-native deployment. commerce platform providing
                  product listings, order management, and payment processing,
                  currently being modernized for cloud-native deployment.
                </div>
              </AnalysisCard>

              {/* Code & Architecture Analysis Card */}
              <AnalysisCard
                title="Code & Architecture Analysis"
                className="mt-5"
              >
                <div className="w-full text-sm font-medium tracking-[-0.08px] max-md:max-w-full">
                  <CodeMetricRow
                    label="System Architecture"
                    value="Monolithic"
                  />
                  <CodeMetricRow
                    label="Coupling Score"
                    value="High (Monolithic Codebase)"
                    className="mt-[19px]"
                  />
                  <CodeMetricRow
                    label="Lines of Code (LoC)"
                    value="1.2M Lines"
                    className="mt-[19px]"
                  />
                  <CodeMetricRow
                    label="Hosting Environment"
                    value="On-Premises"
                    className="mt-[19px]"
                  />
                  <CodeMetricRow
                    label="Code Coverage"
                    value="29.12% (Low, needs improvement)"
                    className="mt-[19px]"
                  />
                  <div className="flex min-h-10 w-full gap-6 flex-wrap mt-[19px] max-md:max-w-full">
                    <div className="text-[rgba(0,141,137,1)] leading-none w-[136px]">
                      File Breakdown
                    </div>
                    <div className="text-[#0a0d14] leading-5 flex-1 shrink basis-[0%]">
                      5,200 Files, 10,500 Functions, 2,300 Classes, 4,700
                      Methods
                    </div>
                  </div>
                  <div className="flex min-h-[86px] w-full gap-[13px] flex-wrap mt-[19px] max-md:max-w-full">
                    <div className="text-[rgba(0,141,137,1)] leading-[18px] w-[136px]">
                      Obsolete Libraries <br />
                      count
                    </div>
                    <div className="min-w-60 text-[#0a0d14] flex-1 shrink basis-[0%]">
                      <div>
                        4 Major outdated libraries (Spring 3.0, jQuery 1.9,
                        Log4j)
                      </div>
                      <div className="mt-2.5">
                        4 Major outdated libraries (Spring 3.0, jQuery 1.9,
                        Log4j)
                      </div>
                    </div>
                  </div>
                  <div className="flex min-h-20 w-full gap-6 flex-wrap mt-[19px] max-md:max-w-full">
                    <div className="text-[rgba(0,141,137,1)] leading-[18px] w-[136px]">
                      Cloud Compatibility Assessment
                    </div>
                    <div className="text-[#0a0d14] leading-5 flex-1 shrink basis-[0%]">
                      Some dependencies incompatible with cloud-native
                      architecture Some dependencies incompatible with
                      cloud-native architecture Some dependencies incompatible
                      with cloud.
                    </div>
                  </div>
                </div>
              </AnalysisCard>

              {/* NFR Compatibility Score Card */}
              <AnalysisCard title="NFR Compatibility Score" className="mt-5">
                <div className="w-full font-medium max-md:max-w-full">
                  <PerformanceMetric
                    label="Performance"
                    percentage="85%"
                    description="(Handles peak load)"
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/0051d04a093a18a46bdb2e9f3d3b4741174c86a1?placeholderIfAbsent=true"
                  />
                  <PerformanceMetric
                    label="Security"
                    percentage="60%"
                    description="(Protects from threats)"
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/4fe5e82558b3dbfaed9be0435559bcad8b064b66?placeholderIfAbsent=true"
                    className="mt-2.5"
                  />
                  <PerformanceMetric
                    label="Compliance"
                    percentage="65%"
                    description="(Meets regulations)"
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/84601feba2cf618847f2086818c9831e63ce726c?placeholderIfAbsent=true"
                    className="mt-2.5"
                  />
                  <PerformanceMetric
                    label="Scalability"
                    percentage="70%"
                    description="(Grows with demand)"
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/9e93888255f6ab516ce108cb35bf81648e7459bf?placeholderIfAbsent=true"
                    className="mt-2.5"
                  />
                  <PerformanceMetric
                    label="Maintainability"
                    percentage="75%"
                    description="(Easy to update)"
                    icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/308af89cd29ec94016ef3fffb73eba05ea62fb6b?placeholderIfAbsent=true"
                    className="mt-2.5"
                  />
                </div>
              </AnalysisCard>
            </div>

            {/* Right Column */}
            <div className="min-w-60 flex-1 shrink basis-[0%] max-md:max-w-full">
              {/* Overall Summary Card */}
              <div className="bg-white shadow-[0px_4px_10px_rgba(205,205,205,0.11)] flex w-full items-center gap-2.5 px-[15px] py-[22px] rounded-2xl max-md:max-w-full">
                <div className="self-stretch min-w-60 w-full flex-1 shrink basis-[0%] my-auto max-md:max-w-full">
                  <div className="text-[rgba(1,36,25,1)] text-lg font-semibold leading-none tracking-[-0.11px] max-md:max-w-full">
                    Overall Summary
                  </div>
                  <div className="w-full mt-5 max-md:max-w-full">
                    {/* Summary Stats */}
                    <div className="bg-[rgba(244,251,251,1)] border flex w-full items-center gap-[18px] overflow-hidden text-[rgba(1,36,25,1)] py-[5px] rounded-lg border-[rgba(202,243,230,1)] border-solid max-md:max-w-full">
                      <div className="self-stretch flex min-w-60 w-full items-center gap-[18px] flex-wrap flex-1 shrink basis-[0%] my-auto px-2.5 max-md:max-w-full">
                        <div className="self-stretch flex items-center gap-[40px_44px] justify-between flex-1 shrink basis-[0%] my-auto">
                          <div className="self-stretch w-[94px] my-auto">
                            <div className="text-base font-semibold leading-none tracking-[-0.1px]">
                              13
                            </div>
                            <div className="text-xs font-normal leading-loose tracking-[-0.07px] mt-1">
                              Total Files
                            </div>
                          </div>
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/6e06cceaf593962e6803f83862cee5601cab9081?placeholderIfAbsent=true"
                            className="aspect-[0.02] object-contain w-px self-stretch shrink-0 my-auto"
                            alt="Divider"
                          />
                        </div>
                        <div className="self-stretch flex items-center gap-[40px_44px] justify-between flex-1 shrink basis-[0%] my-auto">
                          <div className="self-stretch w-[94px] my-auto">
                            <div className="text-base font-semibold leading-none tracking-[-0.1px]">
                              3000
                            </div>
                            <div className="text-xs font-normal leading-loose tracking-[-0.07px] mt-1">
                              LOC Logic
                            </div>
                          </div>
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/1a752af7b40f2522976ecaee7a896583320d15a6?placeholderIfAbsent=true"
                            className="aspect-[0.02] object-contain w-px self-stretch shrink-0 my-auto"
                            alt="Divider"
                          />
                        </div>
                        <div className="self-stretch flex items-center gap-[40px_44px] justify-between flex-1 shrink basis-[0%] my-auto">
                          <div className="self-stretch w-[94px] my-auto">
                            <div className="text-base font-semibold leading-none tracking-[-0.1px]">
                              0
                            </div>
                            <div className="text-xs font-normal leading-loose tracking-[-0.07px] mt-1">
                              LOC GUI
                            </div>
                          </div>
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/f795b4e6c00643d68d7334495ed810caeddeebea?placeholderIfAbsent=true"
                            className="aspect-[0.02] object-contain w-px self-stretch shrink-0 my-auto"
                            alt="Divider"
                          />
                        </div>
                        <div className="self-stretch flex items-center gap-[40px_44px] whitespace-nowrap justify-between flex-1 shrink basis-[0%] my-auto">
                          <div className="self-stretch w-[94px] my-auto">
                            <div className="text-base font-semibold leading-none tracking-[-0.1px]">
                              13
                            </div>
                            <div className="text-xs font-normal leading-loose tracking-[-0.07px] mt-1">
                              Subprograms
                            </div>
                          </div>
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/71ea5f2adff46908f46ee78415d93b77c96b2ca9?placeholderIfAbsent=true"
                            className="aspect-[0.02] object-contain w-px self-stretch shrink-0 my-auto"
                            alt="Divider"
                          />
                        </div>
                        <div className="self-stretch flex items-center justify-between flex-1 shrink basis-[0%] my-auto">
                          <div className="self-stretch w-[94px] my-auto">
                            <div className="text-base font-semibold leading-none tracking-[-0.1px]">
                              196
                            </div>
                            <div className="text-xs font-normal leading-loose tracking-[-0.07px] mt-1">
                              compatibility issues
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Insights Section */}
                    <div className="bg-[rgba(244,251,251,1)] flex w-full flex-col overflow-hidden items-stretch text-sm justify-center mt-2.5 px-[15px] py-3.5 rounded-lg max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <div className="flex w-full gap-[15px] text-[rgba(1,36,25,1)] font-semibold whitespace-nowrap tracking-[-0.08px] leading-none flex-wrap max-md:max-w-full">
                          <div className="flex-1 shrink basis-[0%] max-md:max-w-full">
                            Insights
                          </div>
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/d5fb972f5d0e8691c2efb624aa4f0758b6d3652f?placeholderIfAbsent=true"
                            className="aspect-[1] object-contain w-5 shrink-0"
                            alt="Insights icon"
                          />
                        </div>
                        <div className="w-full mt-[15px] max-md:max-w-full">
                          <div className="flex w-full items-center gap-[45px_47px] text-xs text-[rgba(0,141,137,1)] font-normal whitespace-nowrap justify-between flex-wrap max-md:max-w-full">
                            <div className="self-stretch flex min-w-60 items-center gap-[40px_100px] justify-between w-[354px] my-auto">
                              <div className="self-stretch my-auto">
                                Metrics
                              </div>
                              <div className="text-right self-stretch my-auto">
                                Value
                              </div>
                            </div>
                            <div className="self-stretch flex min-w-60 items-center gap-[40px_100px] justify-between w-[353px] my-auto">
                              <div className="self-stretch my-auto">
                                Metrics
                              </div>
                              <div className="text-right self-stretch my-auto">
                                Value
                              </div>
                            </div>
                          </div>

                          {/* Insight Metrics */}
                          <InsightMetricRow
                            label="Code Smells"
                            value="126"
                            grade="C"
                            className="mt-[13px]"
                          />
                          <div className="flex w-full items-center gap-[45px_47px] justify-between flex-wrap mt-[13px] max-md:max-w-full">
                            <div className="self-stretch flex min-w-60 gap-[40px_100px] justify-between w-[354px] my-auto">
                              <div className="text-black font-normal">
                                Code Smells
                              </div>
                              <div className="flex gap-[5px] whitespace-nowrap">
                                <div className="text-[rgba(53,53,53,1)] font-semibold text-right">
                                  126
                                </div>
                                <div className="text-white font-bold text-center tracking-[0.14px] w-[18px] rounded-sm">
                                  <div className="bg-[rgba(237,199,65,1)] w-[18px] h-[18px] px-0.5 rounded-sm">
                                    C
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="self-stretch flex min-w-60 gap-[40px_100px] whitespace-nowrap justify-between w-[353px] my-auto">
                              <div className="text-black font-normal">Bugs</div>
                              <div className="flex gap-[5px]">
                                <div className="text-[rgba(53,53,53,1)] font-semibold text-right">
                                  67
                                </div>
                                <div className="text-white font-bold text-center tracking-[0.14px] w-[18px] rounded-sm">
                                  <div className="bg-[rgba(253,69,69,1)] w-[18px] h-[18px] px-0.5 rounded-sm">
                                    D
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex w-full items-center gap-[45px_47px] whitespace-nowrap justify-between flex-wrap mt-[13px] max-md:max-w-full">
                            <div className="self-stretch flex min-w-60 gap-[40px_100px] justify-between w-[354px] my-auto">
                              <div className="text-black font-normal">
                                Vulnerabilities
                              </div>
                              <div className="flex gap-[5px]">
                                <div className="text-[rgba(53,53,53,1)] font-semibold text-right">
                                  144
                                </div>
                                <div className="text-white font-bold text-center tracking-[0.14px] w-[18px] rounded-sm">
                                  <div className="bg-[rgba(0,196,135,1)] w-[18px] h-[18px] px-0.5 rounded-sm">
                                    A
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="self-stretch flex min-w-60 gap-[40px_100px] justify-between w-[353px] my-auto">
                              <div className="text-black font-normal">
                                Functions
                              </div>
                              <div className="flex gap-[5px]">
                                <div className="text-[rgba(53,53,53,1)] font-semibold text-right">
                                  17
                                </div>
                                <div className="text-white font-bold text-center tracking-[0.14px] w-[18px] rounded-sm">
                                  <div className="bg-[rgba(237,199,65,1)] w-[18px] h-[18px] px-0.5 rounded-sm">
                                    C
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex w-full items-center gap-[45px_47px] justify-between flex-wrap mt-[13px] max-md:max-w-full">
                            <div className="self-stretch flex min-w-60 gap-[40px_100px] justify-between w-[354px] my-auto">
                              <div className="text-black font-normal">
                                Code Coverage
                              </div>
                              <div className="flex gap-[5px] whitespace-nowrap">
                                <div className="text-[rgba(53,53,53,1)] font-semibold text-right">
                                  0%
                                </div>
                                <div className="text-white font-bold text-center tracking-[0.14px] w-[18px] rounded-sm">
                                  <div className="bg-[rgba(141,196,0,1)] w-[18px] h-[18px] px-0.5 rounded-sm">
                                    B
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="self-stretch flex min-w-60 gap-[40px_100px] whitespace-nowrap justify-between w-[353px] my-auto">
                              <div className="text-black font-normal">
                                Complexity
                              </div>
                              <div className="flex gap-[5px]">
                                <div className="text-[rgba(53,53,53,1)] font-semibold text-right">
                                  7
                                </div>
                                <div className="text-white font-bold text-center tracking-[0.14px] w-[18px] rounded-sm">
                                  <div className="bg-[rgba(0,196,135,1)] w-[18px] h-[18px] px-0.5 rounded-sm">
                                    A
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex w-full gap-[45px_47px] justify-between flex-wrap mt-[13px] max-md:max-w-full">
                            <div className="flex min-w-60 items-center gap-[40px_100px] justify-between w-[354px]">
                              <div className="text-black font-normal self-stretch my-auto">
                                Total Lines of Code
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                11698
                              </div>
                            </div>
                            <div className="flex min-w-60 gap-[40px_100px] justify-between w-[353px]">
                              <div className="text-black font-normal">
                                Duplicate Lines Density
                              </div>
                              <div className="flex gap-[5px] whitespace-nowrap">
                                <div className="text-[rgba(53,53,53,1)] font-semibold text-right">
                                  0%
                                </div>
                                <div className="text-white font-bold text-center tracking-[0.14px] w-[18px] rounded-sm">
                                  <div className="bg-[rgba(141,196,0,1)] w-[18px] h-[18px] px-0.5 rounded-sm">
                                    B
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Files Section */}
                    <div className="bg-[rgba(244,251,251,1)] flex w-full flex-col overflow-hidden items-stretch justify-center mt-2.5 px-[13px] py-3.5 rounded-lg max-md:max-w-full">
                      <div className="w-full max-md:max-w-full">
                        <div className="text-[rgba(1,36,25,1)] text-sm font-semibold leading-none tracking-[-0.08px] max-md:max-w-full">
                          Project Files
                        </div>
                        <div className="relative flex w-full flex-col mt-3.5 max-md:max-w-full">
                          <div className="self-stretch z-0 flex w-full items-center gap-[15px] flex-wrap max-md:max-w-full">
                            <div className="self-stretch text-xs text-[rgba(73,72,72,1)] font-normal whitespace-nowrap tracking-[-0.07px] leading-loose w-2.5 my-auto">
                              <div>5</div>
                              <div className="mt-2.5">4</div>
                              <div className="mt-2.5">3</div>
                              <div className="mt-2.5">2</div>
                              <div className="mt-2.5">1</div>
                              <div className="mt-2.5">0</div>
                            </div>
                            <div className="self-stretch flex min-w-60 flex-col items-stretch justify-center flex-1 shrink basis-[0%] my-auto max-md:max-w-full">
                              <img
                                src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/11fddc85e4556f9bfb4b92bf401f7409c1c952af?placeholderIfAbsent=true"
                                className="aspect-[1000] object-contain w-[730px] max-w-full"
                                alt="Chart"
                              />
                              <img
                                src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/11fddc85e4556f9bfb4b92bf401f7409c1c952af?placeholderIfAbsent=true"
                                className="aspect-[1000] object-contain w-[730px] max-w-full mt-[30px]"
                                alt="Chart"
                              />
                              <img
                                src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/11fddc85e4556f9bfb4b92bf401f7409c1c952af?placeholderIfAbsent=true"
                                className="aspect-[1000] object-contain w-[730px] max-w-full mt-[30px]"
                                alt="Chart"
                              />
                              <img
                                src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/11fddc85e4556f9bfb4b92bf401f7409c1c952af?placeholderIfAbsent=true"
                                className="aspect-[1000] object-contain w-[730px] max-w-full mt-[30px]"
                                alt="Chart"
                              />
                              <img
                                src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/11fddc85e4556f9bfb4b92bf401f7409c1c952af?placeholderIfAbsent=true"
                                className="aspect-[1000] object-contain w-[730px] max-w-full mt-[30px]"
                                alt="Chart"
                              />
                              <img
                                src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/11fddc85e4556f9bfb4b92bf401f7409c1c952af?placeholderIfAbsent=true"
                                className="aspect-[1000] object-contain w-[730px] max-w-full mt-[30px]"
                                alt="Chart"
                              />
                            </div>
                          </div>
                          <div className="self-center z-0 flex w-[683px] max-w-full items-stretch gap-5 text-xs text-[rgba(73,72,72,1)] font-normal text-center tracking-[-0.07px] leading-loose flex-wrap justify-between rounded-[0px_0px_0px_0px]">
                            <div>Forms</div>
                            <div>MDI</div>
                            <div className="flex items-stretch gap-[21px]">
                              <div className="grow">Classes</div>
                              <div>User Controls</div>
                              <div>Documents</div>
                              <div>Modules</div>
                              <div>Property</div>
                              <div>Designers</div>
                            </div>
                          </div>
                          {/* Chart Bars */}
                          <div className="absolute z-0 flex w-[19px] flex-col items-center text-xs text-[rgba(73,72,72,1)] font-normal whitespace-nowrap text-center tracking-[-0.07px] leading-loose left-[62px] bottom-[34px]">
                            <div>1</div>
                            <div className="bg-[rgba(36,229,169,1)] flex min-h-[29px] w-full rounded-[3px]" />
                          </div>
                          <div className="absolute z-0 flex w-[19px] flex-col items-center text-xs text-black font-medium whitespace-nowrap text-center tracking-[-0.07px] leading-loose right-[313px] bottom-[34px]">
                            <div>0</div>
                            <div className="bg-[rgba(36,229,169,1)] flex min-h-[3px] w-full rounded-[3px]" />
                          </div>
                          <div className="absolute z-0 flex w-[19px] flex-col items-center text-xs text-black font-medium whitespace-nowrap text-center tracking-[-0.07px] leading-loose left-[153px] bottom-[34px]">
                            <div>0</div>
                            <div className="bg-[rgba(36,229,169,1)] flex min-h-[3px] w-full rounded-[3px]" />
                          </div>
                          <div className="absolute z-0 flex w-[19px] flex-col items-center text-xs text-black font-medium whitespace-nowrap text-center tracking-[-0.07px] leading-loose right-[222px] bottom-[34px]">
                            <div>4</div>
                            <div className="bg-[rgba(36,229,169,1)] flex min-h-[59px] w-full rounded-[3px]" />
                          </div>
                          <div className="absolute z-0 flex w-[19px] flex-col items-center text-xs text-black font-medium whitespace-nowrap text-center tracking-[-0.07px] leading-loose left-[244px] top-5">
                            <div>4</div>
                            <div className="bg-[rgba(36,229,169,1)] flex min-h-[119px] w-full rounded-[3px]" />
                          </div>
                          <div className="absolute z-0 flex w-[19px] flex-col items-center text-xs text-black font-medium whitespace-nowrap text-center tracking-[-0.07px] leading-loose right-[131px] bottom-[34px]">
                            <div>0</div>
                            <div className="bg-[rgba(36,229,169,1)] flex min-h-[3px] w-full rounded-[3px]" />
                          </div>
                          <div className="absolute z-0 flex w-[19px] flex-col items-center text-xs text-black font-medium whitespace-nowrap text-center tracking-[-0.07px] leading-loose left-[335px] bottom-[34px]">
                            <div>0</div>
                            <div className="bg-[rgba(36,229,169,1)] flex min-h-[3px] w-full rounded-[3px]" />
                          </div>
                          <div className="absolute z-0 flex w-[19px] flex-col items-center text-xs text-black font-medium whitespace-nowrap text-center tracking-[-0.07px] leading-loose right-10 bottom-[34px]">
                            <div>1</div>
                            <div className="bg-[rgba(36,229,169,1)] flex min-h-[29px] w-full rounded-[3px]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Binaries and Members Section */}
                    <div className="flex w-full items-center gap-2.5 flex-wrap mt-2.5 max-md:max-w-full">
                      <div className="bg-[rgba(244,251,251,1)] self-stretch flex min-w-60 flex-col overflow-hidden items-stretch justify-center flex-1 shrink basis-[0%] my-auto p-3.5 rounded-lg">
                        <div className="w-full">
                          <div className="text-[rgba(1,36,25,1)] text-sm font-semibold leading-none tracking-[-0.08px]">
                            Binaries
                          </div>
                          <div className="relative flex w-full flex-col items-stretch mt-[7px]">
                            <div className="z-0 flex w-full items-center gap-[15px] justify-between">
                              <div className="self-stretch text-xs text-[rgba(73,72,72,1)] font-normal whitespace-nowrap tracking-[-0.07px] leading-loose w-2.5 my-auto">
                                <div>5</div>
                                <div className="mt-2.5">4</div>
                                <div className="mt-2.5">3</div>
                                <div className="mt-2.5">2</div>
                                <div className="mt-2.5">1</div>
                                <div className="mt-2.5">0</div>
                              </div>
                              <div className="self-stretch min-w-60 w-[334px] my-auto">
                                <img
                                  src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/8e3646a51e8a6d9b0ad40c7b02e92968f29fcac6?placeholderIfAbsent=true"
                                  className="aspect-[333.33] object-contain w-[334px] max-w-full"
                                  alt="Chart"
                                />
                                <img
                                  src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/8e3646a51e8a6d9b0ad40c7b02e92968f29fcac6?placeholderIfAbsent=true"
                                  className="aspect-[333.33] object-contain w-[334px] max-w-full mt-[30px]"
                                  alt="Chart"
                                />
                                <img
                                  src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/8e3646a51e8a6d9b0ad40c7b02e92968f29fcac6?placeholderIfAbsent=true"
                                  className="aspect-[333.33] object-contain w-[334px] max-w-full mt-[30px]"
                                  alt="Chart"
                                />
                                <img
                                  src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/8e3646a51e8a6d9b0ad40c7b02e92968f29fcac6?placeholderIfAbsent=true"
                                  className="aspect-[333.33] object-contain w-[334px] max-w-full mt-[30px]"
                                  alt="Chart"
                                />
                                <img
                                  src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/8e3646a51e8a6d9b0ad40c7b02e92968f29fcac6?placeholderIfAbsent=true"
                                  className="aspect-[333.33] object-contain w-[334px] max-w-full mt-[30px]"
                                  alt="Chart"
                                />
                                <img
                                  src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/8e3646a51e8a6d9b0ad40c7b02e92968f29fcac6?placeholderIfAbsent=true"
                                  className="aspect-[333.33] object-contain w-[334px] max-w-full mt-[30px]"
                                  alt="Chart"
                                />
                              </div>
                            </div>
                            <div className="z-0 flex w-full items-center gap-[40px_44px] text-xs text-[rgba(73,72,72,1)] font-normal tracking-[-0.07px] leading-loose justify-between pl-[41px] pr-5 max-md:pl-5">
                              <div className="self-stretch w-[30px] my-auto">
                                EXEs
                              </div>
                              <div className="self-stretch w-[30px] my-auto">
                                DLLs
                              </div>
                              <div className="self-stretch w-[50px] my-auto">
                                Controls
                              </div>
                              <div className="self-stretch w-[57px] my-auto">
                                OLE EXEs
                              </div>
                            </div>
                            <div className="absolute z-0 flex gap-[40px_63px] text-xs text-black font-medium whitespace-nowrap text-center tracking-[-0.07px] leading-loose right-11 bottom-[34px]">
                              <div className="w-[19px]">
                                <div>0</div>
                                <div className="bg-[rgba(36,229,169,1)] flex min-h-[3px] w-full rounded-[3px]" />
                              </div>
                              <div className="w-[19px]">
                                <div>0</div>
                                <div className="bg-[rgba(36,229,169,1)] flex min-h-[3px] w-full rounded-[3px]" />
                              </div>
                              <div className="w-[19px]">
                                <div>0</div>
                                <div className="bg-[rgba(36,229,169,1)] flex min-h-[3px] w-full rounded-[3px]" />
                              </div>
                              <div className="w-[19px]">
                                <div>1</div>
                                <div className="bg-[rgba(36,229,169,1)] flex min-h-[29px] w-full rounded-[3px]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[rgba(244,251,251,1)] self-stretch flex min-w-60 flex-col overflow-hidden items-stretch justify-center flex-1 shrink basis-[0%] my-auto p-3.5 rounded-lg">
                        <div className="w-full">
                          <div className="text-[rgba(1,36,25,1)] text-sm font-semibold leading-none tracking-[-0.08px]">
                            Members
                          </div>
                          <div className="flex w-full items-center gap-3 mt-3.5">
                            <div className="self-stretch w-[186px] my-auto">
                              <div className="flex min-h-[186px] flex-col items-stretch justify-center px-[54px] py-[62px] max-md:px-5">
                                <div className="w-[77px]">
                                  <div className="flex w-full flex-col items-stretch rounded-[0px_0px_0px_0px]">
                                    <div className="text-[rgba(29,36,52,1)] text-[26px] font-semibold self-center">
                                      208
                                    </div>
                                    <div className="text-[rgba(94,100,112,1)] text-xs font-normal text-center">
                                      unique <br />
                                      subprograms
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="self-stretch text-xs flex-1 shrink basis-[0%] my-auto">
                              <div className="flex w-full items-center gap-[17px]">
                                <div className="self-stretch gap-[7px] text-black font-normal whitespace-nowrap my-auto">
                                  subroutines
                                </div>
                                <div className="text-[rgba(53,53,53,1)] font-medium text-right self-stretch flex-1 shrink basis-[0%] my-auto">
                                  23 (20%)
                                </div>
                              </div>
                              <div className="flex w-full items-center gap-8 mt-4">
                                <div className="self-stretch gap-[7px] text-black font-normal whitespace-nowrap my-auto">
                                  functions
                                </div>
                                <div className="text-[rgba(53,53,53,1)] font-medium text-right self-stretch flex-1 shrink basis-[0%] my-auto">
                                  58 (10%)
                                </div>
                              </div>
                              <div className="flex w-full items-center gap-[27px] mt-4">
                                <div className="self-stretch gap-[7px] text-black font-normal whitespace-nowrap my-auto">
                                  properties
                                </div>
                                <div className="text-[rgba(53,53,53,1)] font-medium text-right self-stretch flex-1 shrink basis-[0%] my-auto">
                                  77 (30%)
                                </div>
                              </div>
                              <div className="flex w-full items-center gap-[40px_42px] mt-4">
                                <div className="self-stretch gap-[7px] text-black font-normal whitespace-nowrap my-auto">
                                  externs
                                </div>
                                <div className="text-[rgba(53,53,53,1)] font-medium text-right self-stretch flex-1 shrink basis-[0%] my-auto">
                                  23 (20%)
                                </div>
                              </div>
                              <div className="flex w-full items-center gap-[38px] mt-4">
                                <div className="self-stretch gap-[7px] text-black font-normal whitespace-nowrap my-auto">
                                  handlers
                                </div>
                                <div className="text-[rgba(53,53,53,1)] font-medium text-right self-stretch flex-1 shrink basis-[0%] my-auto">
                                  18 (10%)
                                </div>
                              </div>
                              <div className="flex w-full items-center justify-between mt-4">
                                <div className="self-stretch gap-[7px] text-black font-normal whitespace-nowrap my-auto">
                                  events
                                </div>
                                <div className="text-[rgba(53,53,53,1)] font-medium text-right self-stretch flex-1 shrink basis-[0%] my-auto">
                                  9 (10%)
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* COM Components and Win32 API Section */}
                    <div className="flex w-full items-center gap-[11px] text-sm flex-wrap mt-2.5 max-md:max-w-full">
                      <div className="bg-[rgba(244,251,251,1)] self-stretch flex min-w-60 flex-col overflow-hidden items-stretch justify-center flex-1 shrink basis-[0%] my-auto p-3.5 rounded-lg">
                        <div className="w-full">
                          <div className="text-[rgba(1,36,25,1)] font-semibold leading-none tracking-[-0.08px]">
                            COM components
                          </div>
                          <div className="w-full mt-3.5">
                            <div className="flex w-full items-center gap-[40px_100px] text-xs text-[rgba(0,141,137,1)] font-normal whitespace-nowrap justify-between">
                              <div className="self-stretch my-auto">
                                Category
                              </div>
                              <div className="text-right self-stretch my-auto">
                                Count
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] justify-between mt-[15px]">
                              <div className="text-black font-normal self-stretch my-auto">
                                Total Reference
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                126
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] justify-between mt-[15px]">
                              <div className="text-black font-normal self-stretch my-auto">
                                unique members
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                18
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] whitespace-nowrap justify-between mt-[15px]">
                              <div className="text-black font-normal self-stretch my-auto">
                                Types
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                6
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] whitespace-nowrap justify-between mt-[15px]">
                              <div className="text-black font-normal self-stretch my-auto">
                                components
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                2
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[rgba(244,251,251,1)] self-stretch flex min-w-60 flex-col overflow-hidden items-stretch justify-center flex-1 shrink basis-[0%] my-auto p-3.5 rounded-lg">
                        <div className="w-full">
                          <div className="text-[rgba(1,36,25,1)] font-semibold leading-none tracking-[-0.08px]">
                            Win32 API
                          </div>
                          <div className="w-full mt-3.5">
                            <div className="flex w-full items-center gap-[40px_100px] text-xs text-[rgba(0,141,137,1)] font-normal whitespace-nowrap justify-between">
                              <div className="self-stretch my-auto">
                                Category
                              </div>
                              <div className="text-right self-stretch my-auto">
                                Count
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] justify-between mt-[15px]">
                              <div className="text-black font-normal self-stretch my-auto">
                                API Calls To Unique Entry Points
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                67
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] justify-between mt-[15px]">
                              <div className="text-black font-normal self-stretch my-auto">
                                Unique Entry Points
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                17
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] whitespace-nowrap justify-between mt-[15px]">
                              <div className="text-black font-normal self-stretch my-auto">
                                Libraries
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                7
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] justify-between mt-[15px]">
                              <div className="text-black font-normal self-stretch my-auto">
                                API Calls to User Procedures
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                23
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* UI Overview and Issues Section */}
                    <div className="flex w-full items-center gap-2.5 flex-wrap mt-2.5 max-md:max-w-full">
                      <div className="bg-[rgba(244,251,251,1)] self-stretch flex min-w-60 flex-col overflow-hidden items-stretch text-sm justify-center flex-1 shrink basis-[0%] my-auto px-3.5 py-[18px] rounded-lg">
                        <div className="w-full">
                          <div className="text-[rgba(1,36,25,1)] font-semibold leading-none tracking-[-0.08px]">
                            UI Overview
                          </div>
                          <div className="w-full mt-[21px]">
                            <div className="flex w-full items-center gap-[40px_100px] justify-between">
                              <div className="text-black font-normal self-stretch my-auto">
                                UI Containers
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                1
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] justify-between mt-3.5">
                              <div className="text-black font-normal self-stretch my-auto">
                                Control Instances
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                3
                              </div>
                            </div>
                            <div className="flex w-full items-center gap-[40px_100px] justify-between mt-3.5">
                              <div className="text-black font-normal self-stretch my-auto">
                                Unique Control Types
                              </div>
                              <div className="text-[rgba(53,53,53,1)] font-semibold text-right self-stretch my-auto">
                                3
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[rgba(244,251,251,1)] self-stretch flex min-w-60 min-h-[156px] flex-col overflow-hidden items-stretch justify-center flex-1 shrink basis-[0%] my-auto px-3.5 py-[15px] rounded-lg">
                        <div className="w-full">
                          <div className="text-[rgba(1,36,25,1)] text-sm font-semibold leading-none tracking-[-0.08px]">
                            Issues
                          </div>
                          <div className="w-full mt-2.5">
                            <div className="w-full">
                              <div className="flex w-full items-center justify-between">
                                <div className="bg-[rgba(71,230,164,1)] self-stretch flex w-[63px] shrink-0 h-3.5 my-auto rounded-[8px_0px_0px_8px]" />
                                <div className="bg-[rgba(0,98,255,1)] self-stretch flex min-w-60 w-[296px] shrink h-3.5 flex-1 basis-[0%] my-auto rounded-[0px_8px_8px_0px]" />
                              </div>
                              <div className="flex w-full items-center gap-[40px_100px] text-sm text-[rgba(1,36,25,1)] font-bold whitespace-nowrap tracking-[-0.08px] leading-none justify-between mt-1">
                                <div className="self-stretch my-auto">25</div>
                                <div className="self-stretch my-auto">196</div>
                              </div>
                            </div>
                            <div className="flex w-[294px] max-w-full flex-col items-stretch text-xs text-[rgba(73,72,72,1)] font-normal tracking-[-0.07px] leading-loose mt-3.5">
                              <div className="flex w-full items-center gap-1">
                                <div className="bg-[rgba(71,230,164,1)] self-stretch flex w-3 shrink-0 h-3 my-auto rounded-[50%]" />
                                <div className="self-stretch my-auto">
                                  types of potential language compatibility
                                  issues
                                </div>
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <div className="bg-[rgba(0,98,255,1)] self-stretch flex w-3 shrink-0 h-3 my-auto rounded-[50%]" />
                                <div className="self-stretch my-auto">
                                  No of times issue occurs
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & Dependency Risks Section */}
              <div className="bg-white flex w-full flex-col overflow-hidden items-stretch justify-center mt-5 px-4 py-5 rounded-[18px] max-md:max-w-full">
                <div className="flex w-full flex-col items-stretch max-md:max-w-full">
                  <div className="self-center max-w-full w-[775px] text-lg text-black font-semibold tracking-[-0.2px] leading-none">
                    <div className="max-md:max-w-full">
                      Security & Dependency Risks
                    </div>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/b1f7925b159abd244682890a13c64c46faa2f472?placeholderIfAbsent=true"
                      className="aspect-[2.87] object-contain w-full mt-5 rounded-xl max-md:max-w-full"
                      alt="Security risks chart"
                    />
                  </div>
                  <div className="flex w-full items-stretch gap-2.5 flex-wrap mt-11 max-md:max-w-full max-md:mt-10">
                    <div className="min-w-60 flex-1 shrink basis-[0%]">
                      <SecurityRiskItem
                        color="bg-[rgba(237,30,30,1)]"
                        label="Open Security Vulnerabilities"
                        count="(3)"
                      />
                      <SecurityRiskItem
                        color="bg-[rgba(30,51,237,1)]"
                        label="API Security Issues"
                        count="(4)"
                        className="mt-2"
                      />
                      <SecurityRiskItem
                        color="bg-[rgba(30,237,230,1)]"
                        label="Regulatory Risks"
                        count="(2)"
                        className="mt-2"
                      />
                      <SecurityRiskItem
                        color="bg-[rgba(174,187,28,1)]"
                        label="Single Points of Failure (SPOF)"
                        count="(4)"
                        className="mt-2"
                      />
                    </div>
                    <div className="bg-[rgba(230,234,240,1)] flex w-px shrink-0 h-40 my-auto" />
                    <div className="min-w-60 flex-1 shrink basis-[0%]">
                      <SecurityRiskItem
                        color="bg-[rgba(237,30,30,1)]"
                        label="Security Vulnerabilities"
                        count="(3)"
                        icon="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/8b84c7d5ac1e0e4b176cd1ed6a21e4113aecb6c8?placeholderIfAbsent=true"
                        details={[
                          "SQL Injection, Hardcoded Secrets, Weak Encryption",
                          "SQL Injection, Hardcoded Secrets, Weak Encryption",
                        ]}
                        isExpanded={true}
                      />
                      <div className="bg-white flex w-full gap-1 mt-2 pr-[7px] py-2 rounded-md">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/a076a2761f2b242260a39775e5d2ea1b3b95d3d9?placeholderIfAbsent=true"
                          className="aspect-[1] object-contain w-5 shrink-0"
                          alt="Components icon"
                        />
                        <div className="flex min-w-60 items-center gap-2 text-sm font-medium tracking-[-0.08px] leading-none w-[313px]">
                          <div className="bg-[rgba(30,51,237,1)] self-stretch flex w-3.5 shrink-0 h-3.5 my-auto rounded-[3px]" />
                          <div className="self-stretch flex min-w-60 items-center gap-2 w-[287px] my-auto">
                            <div className="text-[#0A0D14] self-stretch my-auto">
                              Riskiest Components{" "}
                            </div>
                            <div className="text-[rgba(10,13,20,1)] text-right self-stretch w-[141px] my-auto">
                              (10)
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-stretch justify-center w-8 p-0.5">
                          <div className="border-t-[color:var(--neutral-300,#CDD0D5)] shadow-[0px_4px_4px_0px_rgba(15,15,16,0.06)_inset] bg-[#E2E4E9] flex flex-col justify-center p-0.5 rounded-[96px] border-t border-solid">
                            <div className="border-r-[color:var(--stroke-white-0,#FFF)] border-b-[color:var(--stroke-white-0,#FFF)] border-l-[color:var(--stroke-white-0,#FFF)] shadow-[0px_-3px_3px_0px_rgba(228,229,231,0.48)_inset,0px_6px_10px_0px_rgba(27,28,29,0.06),0px_2px_4px_0px_rgba(27,28,29,0.02)] bg-white flex w-3 shrink-0 h-3 rounded-[56px] border-r border-solid border-b border-l" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeAnalyseCompleted;
