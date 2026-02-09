"use client"

import React from 'react';
import Link from 'next/link';
import { DatabaseIcon, TwitterIcon, GithubIcon, LinkedinIcon } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="relative z-10 border-t border-border bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                    {/* Brand Section */}
                    <div className="col-span-1 lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <DatabaseIcon className="size-5" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-foreground">Adeloop</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
                            Next-generation analytics and BI platform. DuckDB, RAG, and GenAI in one workspace.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-accent text-muted-foreground hover:text-primary transition-colors"
                                aria-label="Twitter"
                            >
                                <TwitterIcon className="size-4" />
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-accent text-muted-foreground hover:text-primary transition-colors"
                                aria-label="GitHub"
                            >
                                <GithubIcon className="size-4" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-accent text-muted-foreground hover:text-primary transition-colors"
                                aria-label="LinkedIn"
                            >
                                <LinkedinIcon className="size-4" />
                            </a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="font-bold text-foreground mb-6 uppercase text-xs tracking-wider">Product</h4>
                        <ul className="space-y-3.5">
                            <li>
                                <Link href="" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">
                                    Changelog
                                </Link>
                            </li>
                            <li>
                                <Link href="" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">
                                    Integrations
                                </Link>
                            </li>
                            <li>
                                <Link href="" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">
                                    Security
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-bold text-foreground mb-6 uppercase text-xs tracking-wider">Company</h4>
                        <ul className="space-y-3.5">
                            <li>
                                <Link href="" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="mailto:adeleddarai29@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">
                                    Partners
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="font-bold text-foreground mb-6 uppercase text-xs tracking-wider">Support</h4>
                        <ul className="space-y-3.5">
                            <li>
                                <Link href="" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">
                                    Community
                                </Link>
                            </li>
                            <li>
                                <Link href="" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link href="" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">
                                    Terms
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground">© 2024 Adeloop Inc. All rights reserved.</p>
                    <p className="text-xs text-muted-foreground">Analytics & BI, powered by GenAI.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
