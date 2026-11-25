package com.moonlight.pdfview

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

/** A PDF drawn with the system PdfRenderer; Android's WebView cannot show one. */
class MoonlightPdfViewModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("MoonlightPdfView")

    View(MoonlightPdfView::class) {
      Events("onLoadError")
      Prop("uri") { view: MoonlightPdfView, uri: String -> view.load(uri) }
      OnViewDestroys { view: MoonlightPdfView -> view.release() }
    }
  }
}
