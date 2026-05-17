import { HelpCircle, PenLine, Send } from "lucide-react";
import "../../style/home.css";

export default function CreatePostBox({ userName = "User" }: { userName?: string }) {
  return (
    <div className="create-post-box">
      <div className="create-post-top flex items-center gap-3 w-full">
        <div className="create-post-avatar flex-shrink-0">
          {userName.charAt(0).toUpperCase()}
        </div>
        
        {/* === INPUT UIVERSE === */}
        <form className="uiverse-form">
          <label htmlFor="search">
            <input 
              required 
              autoComplete="off" 
              placeholder="Apa yang ingin Anda tanyakan atau bagikan?" 
              id="search" 
              type="text" 
            />
            <div className="icon">
              {/* Ikon Tulis (Default) & Ikon Tanya (Saat diklik) */}
              <PenLine className="swap-on" size={18} />
              <HelpCircle className="swap-off" size={18} />
            </div>
            <button type="reset" className="close-btn">
              <svg viewBox="0 0 20 20" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" fillRule="evenodd" />
              </svg>
            </button>
          </label>
        </form>
      </div>

      <div className="create-post-actions flex gap-3 mt-4">
        {/* === BUTTON UIVERSE (Tanya & Jawab dibuat abu-abu biar netral) === */}
        <button className="flex items-center gap-2 cursor-pointer transition-all bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border-gray-300 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
          <HelpCircle size={18} />
          <span className="font-semibold text-sm">Tanya</span>
        </button>

        <button className="flex items-center gap-2 cursor-pointer transition-all bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border-gray-300 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
          <PenLine size={18} />
          <span className="font-semibold text-sm">Jawab</span>
        </button>

        {/* === BUTTON UIVERSE (Warna biru utama buat tombol Kirim) === */}
        <button className="ml-auto flex items-center gap-2 cursor-pointer transition-all bg-blue-500 text-white px-5 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
          <Send size={18} />
          <span className="font-semibold text-sm">Kiriman</span>
        </button>
      </div>
    </div>
  );
}